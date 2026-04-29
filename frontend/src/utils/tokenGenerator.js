import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export class TokenGenerator {
  static toThreeDigitCode(value) {
    const hash = CryptoJS.SHA256(String(value)).toString(CryptoJS.enc.Hex);
    const num = (parseInt(hash.substring(0, 8), 16) % 900) + 100;
    return String(num).padStart(3, '0');
  }

  /**
   * Generates a compact 3-digit numeric tracking token (100-999)
   * Uses a SHA256-derived value to reduce collision likelihood.
   */
  static generateTrackingToken(product, origin) {
    const rawData = `${product}-${origin}-${Date.now()}-${uuidv4()}`;
    return this.toThreeDigitCode(rawData);
  }

  /**
   * Normalizes any legacy token (e.g. VTX-XXXX) into a 3-digit code.
   */
  static normalizeTrackingToken(tokenLike) {
    const token = String(tokenLike ?? '');
    if (/^\d{3}$/.test(token)) return token;
    return this.toThreeDigitCode(token);
  }

  /**
   * Generates a deterministic QR payload object
   */
  static generateQRPayload(trackingToken, metadata) {
    return JSON.stringify({
      ver: '1.0',
      token: trackingToken,
      meta: metadata,
      timestamp: Date.now(),
    });
  }
}
