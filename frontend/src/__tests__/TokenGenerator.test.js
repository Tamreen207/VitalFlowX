import { describe, it, expect } from 'vitest';
import { TokenGenerator } from '../utils/tokenGenerator';

describe('TokenGenerator', () => {
  it('should generate a valid tracking token format', () => {
    const token = TokenGenerator.generateTrackingToken('Vaccine', 'NYC');
    expect(token).toBeDefined();
    // Now tokens are 3-digit numeric codes
    expect(/^[0-9]{3}$/.test(token)).toBe(true);
    expect(token.length).toBe(3);
  });

  it('should generate unique tokens for identical inputs due to uuid and timestamp', () => {
    const token1 = TokenGenerator.generateTrackingToken('Vaccine', 'NYC');
    const token2 = TokenGenerator.generateTrackingToken('Vaccine', 'NYC');
    expect(token1).not.toBe(token2);
  });

  it('should generate a valid JSON payload for QR code', () => {
    const token = '102';
    const payload = TokenGenerator.generateQRPayload(token, { temp: -70 });
    
    expect(() => JSON.parse(payload)).not.toThrow();
    const parsed = JSON.parse(payload);
    expect(parsed.token).toBe(token);
    expect(parsed.meta.temp).toBe(-70);
    expect(parsed.ver).toBe('1.0');
    expect(parsed.timestamp).toBeDefined();
  });
});
