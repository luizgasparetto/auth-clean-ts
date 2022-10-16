import fs from "fs";

import nodemailer, { Transporter } from 'nodemailer';
import handlebars from "handlebars";

import { IMailService } from "./i-mail-service";


export class EtherealMailServiceImpl implements IMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        }
      });

      this.client = transporter;
    }).catch(err => console.log(err));
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "TurnPro <noreply@turnpro.com>",
      subject,
      html: templateHTML
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}