import { NextRequest } from "next/server";

// Nodemailer
import nodemailer, { SendMailOptions } from "nodemailer";

// React-email
import { render } from "@react-email/render";

// Components
import SendPdfEmail from '@/components/templates/email/SendPdfEmail';

// Helpers
import { fileToBuffer } from "@/lib/helpers";


// let transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "hi@lamarr.tech",
//       pass: 'Voh94038',
//     },
//   });

const Email = process.env.EMAIL
const Password = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: Email,
        pass: Password,
    },
});

/**
 * Send a PDF as an email attachment.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean, indicating whether the email was sent successfully.
 * @throws {Error} Throws an error if there is an issue with sending the email.
 */
export async function sendPdfToEmailService(
    req: NextRequest
): Promise<boolean> {
    const fd = await req.formData();

    // Get form data values
    const email = fd.get("email") as string;
    const sender = fd.get("sender") as string;
    const invoicePdf = fd.get("invoicePdf") as File;
    const invoiceNumber = fd.get("invoiceNumber") as string;

    // Get email html content
    const emailHTML = render(SendPdfEmail({ invoiceNumber }));

    // Convert file to buffer
    const invoiceBuffer = await fileToBuffer(invoicePdf);

    console.log(email)
    console.log(sender)
    console.log(invoicePdf)

    try {
        const mailOptions: any = {
            from: "Votum",
            to: email,
            subject: `Hey ${sender} has send you a payment invoice Make sure you pay before Due Date : #${invoiceNumber}`,
            html: emailHTML,
            attachments: [
                {
                    filename: "invoice.pdf",
                    content: invoiceBuffer,
                },
            ],
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result)
        return true;
    } catch (error) {
        console.error("Error sending email", error);
        return false;
    }
}
