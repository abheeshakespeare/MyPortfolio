import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: 'kumarabhishekmishra28@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #007BFF;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="border-left: 4px solid #007BFF; padding-left: 15px; margin-top: 10px; background-color: #f9f9f9;">
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <br/>
          <p style="font-size: 0.9em; color: #999;">This message was sent via your portfolio contact form.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 