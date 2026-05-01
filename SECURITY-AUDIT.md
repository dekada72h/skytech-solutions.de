# Security Audit – skytech-solutions.de

**Data audytu:** 2026-05-01
**Scope:** Next.js 14 admin panel + 2FA + Postgres, hostowany w kontenerze Docker na VPS (Traefik reverse proxy).
**Audyt obejmuje:** ten projekt jako jeden z 4 site'ów na shared VPS. Pełny raport infrastrukturalny: `Agencja/SECURITY-AUDIT.md` w repozytorium [`dekada72h/Agencja`](https://github.com/dekada72h/Agencja).
**Wynik:** 🟢 **MOCNY** po dzisiejszych naprawach.

---

## Naprawy zaaplikowane 2026-05-01

### 1. `/api/admin/me/2fa/disable` – wymaga teraz hasła + TOTP
**Przed:** sama cookie sesji wystarczała by wyłączyć 2FA. Stolen session = bypass second factor.
**Po:** endpoint przyjmuje `{ password, totp? }`, walidacja Zod, `bcrypt.compare(password, user.passwordHash)`, jeśli 2FA aktywne także `totpVerify(totp, user.twoFactorSecret)`.
**Pliki:** `src/app/api/admin/me/2fa/disable/route.ts`, `src/app/admin/settings/SettingsClient.tsx`.

### 2. `/api/contact` i `/api/leads` – honeypot + timestamp guard
**Przed:** brak zabezpieczeń mimo komentarza "Anti-spam: sprawdzanie honeypot field" w kodzie. Tester wysłał POST z minimalnym payloadem → lead w DB.
**Po:**
- Schemat Zod accepts optional `website` (honeypot) + `ts` (mount timestamp ms).
- Server-side: jeśli `website` filled → `200 OK { id: null }` (silent drop, brak DB insert). Jeśli `Date.now() - ts < 1500` → silent drop.
- UI Contact form: hidden input `<div aria-hidden style="position:absolute;left:-9999px">` z `tabindex=-1, autocomplete=off`. `mountTs` z `useState(() => Date.now())`.

**Pliki:** `src/app/api/contact/route.ts`, `src/app/api/leads/route.ts`, `src/components/Contact.tsx`.

### 3. Rate-limiting (Traefik middleware – w infra, nie w kodzie)
Dodane na poziomie Traefik dla wszystkich Skytech routes (`.de` + `.pl`):
- `/api/auth/*` → 10 req/min average, burst 20 (auth-ratelimit middleware)
- `/api/contact`, `/api/leads` → 30 req/min average, burst 60 (public-api-ratelimit middleware)

Realizowane przez dodatkowe Traefik routery z `priority=200` (override catch-all). Konfig w `/srv/sites/skytech-solutions/docker-compose.yml` na VPS i w globalnym `/srv/traefik/dynamic.yml`. Lokalnie: bez zmian w kodzie aplikacji.

### 4. Globalny CSP + COOP/CORP (Traefik)
Wszystkie odpowiedzi zwracają teraz `Content-Security-Policy` z `default-src 'self'` + zaufane zewnętrzne origins (Google Analytics, Formspree, Unsplash). `Cross-Origin-Opener-Policy: same-origin` i `Cross-Origin-Resource-Policy: same-origin` jako mitigacja Spectre-class.

---

## Status pozostałych elementów

| Kontrola | Stan |
|---|---|
| `npm audit` runtime | ✅ czyste (4 dev-only suggestions, eslint-related) |
| Walidacja Zod na każdym endpoincie | ✅ |
| `requireAdmin()` / `requireSession()` na `/api/admin/*` | ✅ |
| Password reset z hashowanym tokenem (sha256) + 1h expiry | ✅ |
| Forgot zawsze `200` (nie wycieka istnienia emaila) | ✅ |
| Self-delete ADMIN-a zablokowany | ✅ |
| 2FA TOTP (otplib + QR) | ✅ |
| **2FA disable wymaga password+TOTP** | ✅ **(nowe)** |
| Bcrypt cost 12 | ✅ |
| Postgres na private network only (skytech-internal) | ✅ |
| Postgres random 31-char password (env) | ✅ |
| Container user nextjs (1001) | ✅ |
| **/api/contact + /api/leads honeypot + ts** | ✅ **(nowe)** |
| **Rate-limit auth (10/min) + public-api (30/min)** | ✅ **(nowe – Traefik)** |
| **CSP, COOP, CORP** | ✅ **(nowe – Traefik)** |
| HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff | ✅ |

---

## Verify
```bash
# Honeypot drop
curl -X POST -H 'Content-Type: application/json' \
  -d '{"name":"Bot","email":"a@b.de","message":"spam test","website":"https://x.com"}' \
  https://skytech-solutions.de/api/contact
# → {"ok":true,"id":null}    (no DB insert)

# Normal accepted
curl -X POST -H 'Content-Type: application/json' \
  -d '{"name":"Real","email":"a@b.de","message":"legitimate inquiry"}' \
  https://skytech-solutions.de/api/contact
# → {"ok":true,"id":"cmom..."}

# Rate-limit auth
for i in {1..30}; do curl -ks -o /dev/null -w '%{http_code} ' \
  -X POST -d '{"email":"x@x.de"}' https://skytech-solutions.de/api/auth/forgot; done
# → 200×20 then 429×10
```

Pełny raport audytu (5 domen, VPS hardening, nmap, sslscan, lynis): patrz repo `Agencja` → `SECURITY-AUDIT.md`.
