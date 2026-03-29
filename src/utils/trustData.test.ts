import { test } from 'node:test';
import assert from 'node:assert/strict';
import { statsData, partners } from './trustData.ts';

test('statsData is an array of 4 objects with expected properties', () => {
  assert.strictEqual(Array.isArray(statsData), true);
  assert.strictEqual(statsData.length, 4);

  statsData.forEach((stat) => {
    assert.strictEqual(typeof stat.value, 'string');
    assert.strictEqual(typeof stat.title, 'string');
    assert.strictEqual(typeof stat.description, 'string');
  });

  assert.strictEqual(statsData[0].title, 'Wasserverbrauch');
  assert.strictEqual(statsData[1].title, 'Ertragssteigerung');
  assert.strictEqual(statsData[2].title, 'Haftpflichtversicherung');
  assert.strictEqual(statsData[3].title, 'Dokumentation');
});

test('partners is an array of 6 strings including SolarEdge', () => {
  assert.strictEqual(Array.isArray(partners), true);
  assert.strictEqual(partners.length, 6);

  partners.forEach((partner) => {
    assert.strictEqual(typeof partner, 'string');
  });

  assert.ok(partners.includes('SolarEdge'));
  assert.ok(partners.includes('SMA Solar'));
});
