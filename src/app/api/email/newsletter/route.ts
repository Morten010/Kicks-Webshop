import { Resend } from 'resend';

export const POST = (req: Request, res: Response) => {
    
    const resend = new Resend('re_7v5acNT8_GXFQ39viWf3XPJuT5XPv8F6s');

    resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'itismorten@outlook.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

}