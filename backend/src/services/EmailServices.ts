// A service to send email to specified user
interface IMailTo {
  name: string;
  email: string;
}

interface IMailMessage {
  subject: string;
  body: string;
  //attachments doesn't mandatory
  attachments?: string[];
}

// An Interface to show that the info on the sendMail shoul be to a destinatary
interface IMessageDTO {
  to: IMailTo;
  message: IMailMessage;
}
// DTO -> Data Transfer Object (DDD)

// to handle class types, and structure
interface IEmailService {
  sendMail(request: IMessageDTO): void;
}

class EmailService implements IEmailService {
  // without IMessageDTO
  //   sendMail(to: IMailTo, message: IMailMessage) {
  //     console.log(`Email enviado para ${to.name}: ${message.subject}`);
  //   }
  // with IMessageDTO
  sendMail({ to, message }: IMessageDTO) {
    console.log(`Email enviado para ${to.name}: ${message.subject}`);
  }
}
export default EmailService;
