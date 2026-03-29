import { test } from 'node:test';
import assert from 'node:assert';
import { navLinks, toggleMenu } from './navbar.ts';

test('navLinks has the correct entries', () => {
  assert.strictEqual(navLinks.length, 4);
  assert.strictEqual(navLinks[0].href, '/leistungen');
  assert.strictEqual(navLinks[0].label, 'Leistungen');
  assert.strictEqual(navLinks[1].href, '/ueber-uns');
  assert.strictEqual(navLinks[1].label, 'Über uns');
  assert.strictEqual(navLinks[2].href, '/faq');
  assert.strictEqual(navLinks[2].label, 'FAQ');
  assert.strictEqual(navLinks[3].href, '/kontakt');
  assert.strictEqual(navLinks[3].label, 'Kontakt');
});

test('toggleMenu toggles boolean state correctly', () => {
  assert.strictEqual(toggleMenu(false), true);
  assert.strictEqual(toggleMenu(true), false);
});
