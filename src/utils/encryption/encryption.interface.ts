export interface EncryptionOptions {
  key: string;
  algorithm: string;
  ivLength: number;
  iv?: string;
}
