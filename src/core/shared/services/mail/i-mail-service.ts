export interface IMailService {
  sendMail(to: string, subject: string, variables: any, path: string): Promise<void>;
}