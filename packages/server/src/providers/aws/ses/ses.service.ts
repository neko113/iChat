import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import sanitizeHtml from 'sanitize-html';
@Injectable()
export class SESService {
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get('AWS_SES_REGION'),
    });
  }

  async sendEmail(params: EmailParams) {
    try {
      const command = this.createSendEmailCommand(params);
      await this.sesClient.send(command);
    } catch (error) {
      console.error(error);
    }
  }

  private createSendEmailCommand({ body, from, subject, to }: EmailParams) {
    const command = new SendEmailCommand({
      // 받는 사람
      Destination: {
        ToAddresses: [to],
      },
      // 보내는 사람
      Source: from,
      // 메일 내용 (제목, 내용)
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: sanitizeHtml(body, { allowedTags: [] }),
          },
        },
      },
    });

    return command;
  }

  // TODO:
  createCommentEmail({
    postAuthor,
    postTitle,
    postSlug,
    username,
    profileImage,
    comment,
  }: CreateCommentEmailParams) {
    return `
    <body
    style="
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      bgcolor="#f9f9f9"
    >
      <tr>
        <td align="center">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                style="background-color: #ffab37; padding: 40px; color: #fff"
              >
                <h1 style="margin: 0; font-size: 36px">이메일 제목</h1>
                <p style="margin: 20px 0 0; font-size: 18px">이메일 부제목</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #fff; padding: 40px">
                <h2 style="margin: 0; font-size: 24px; color: #ffab37">
                  본문 제목
                </h2>
                <p style="margin-top: 20px; font-size: 16px; color: #666">
                  안녕하세요!
                </p>
                <p style="font-size: 16px; color: #666">
                  이메일 본문 내용입니다.
                </p>
                <p style="font-size: 16px; color: #666">감사합니다.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #ffab37; padding: 40px; color: #fff">
                <p style="margin: 0; font-size: 14px">
                  이메일 하단에 추가 정보 또는 링크를 입력할 수 있습니다.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
    `;
  }
}

interface EmailParams {
  to: string;
  subject: string;
  body: string;
  from: string;
}

interface CreateCommentEmailParams {
  postAuthor: string;
  postTitle: string;
  postSlug: string;
  username: string;
  profileImage: string | null;
  comment: string;
}