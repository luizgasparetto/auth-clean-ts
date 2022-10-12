export interface ICryptographyService {
  hash(plaintext: string): Promise<string>;
  compare(plaintext: string, value: string): Promise<boolean>;
}