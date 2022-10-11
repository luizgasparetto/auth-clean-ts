export interface ICryptographyService {
  hash(plaintext: string): Promise<string>;
}