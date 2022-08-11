import { AppEncryptionTransformer } from './encryption.transformer';

export class NumberEncryptionTransformer extends AppEncryptionTransformer {
  from(value: string): number {
    const decryptedValue = super.from(value);
    return parseFloat(decryptedValue);
  }
}
