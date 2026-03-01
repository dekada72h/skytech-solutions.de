import { describe, it } from 'node:test';
import assert from 'node:assert';
import { fmt } from './formatters.ts';

describe('formatters', () => {
  describe('fmt', () => {
    it('formats small integers correctly', () => {
      assert.strictEqual(fmt(5), '5');
      assert.strictEqual(fmt(50), '50');
      assert.strictEqual(fmt(150), '150');
    });

    it('formats integers with thousands separators', () => {
      assert.strictEqual(fmt(1000), '1.000');
      assert.strictEqual(fmt(5000), '5.000');
      assert.strictEqual(fmt(1000000), '1.000.000');
    });

    it('formats negative numbers correctly', () => {
      assert.strictEqual(fmt(-5), '-5');
      assert.strictEqual(fmt(-1000), '-1.000');
      assert.strictEqual(fmt(-1000000), '-1.000.000');
    });

    it('formats zero correctly', () => {
      assert.strictEqual(fmt(0), '0');
    });

    it('formats decimals correctly', () => {
      assert.strictEqual(fmt(1.5), '1,5');
      assert.strictEqual(fmt(1234.56), '1.234,56');
    });
  });
});
