import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

interface ISendMail {
  to: string;
  subject: string;
  variables: {
    name: string;
    title: string;
    description: string;
  };
  path: string;
}

class SendMailProvider {
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
        },
      });
      this.client = transporter;
    });
  }

  public async execute({ to, variables, subject, path }: ISendMail) {
    const templateFileContent = fs.readFileSync(path).toString('utf8');

    const mailtemplateParse = handlebars.compile(templateFileContent);

    const html = mailtemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com>',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailProvider();
