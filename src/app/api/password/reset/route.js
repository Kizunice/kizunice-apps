import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'    

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Akun dengan email tersebut tidak tersedia, Silahkan daftar!');
  }

  await sendEmailToResetPassword(user)

  return new NextResponse('Send email to reset password success', {status: 200});
}


const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 0,
  secure : true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmailToResetPassword = async (user) => {

  const output = `
  <div style="background-color: white;padding: 1rem; max-width: 40rem;margin: auto;">
 
  <p style="font-size:16px;text-align:center">Halo ${user.name}</p>

   <p style="font-size:16px;text-align:center">Kamu telah melakukan permintaan lupa password, klik link dibawah untuk
          menuju halaman ubah password</p>
    <br />
    <div style="text-align: center;">
        <a class=”link” href="http://localhost:3000/reset-password/${user.id}" target="_blank"
        style="background-color:#AF282F;padding:8px 16px;color:white;text-decoration:none;border-radius:5px">
        Ubah Password
        </a>
    </div>

  <br />
  <br />
  <br />
  <p style="font-size:15px;text-align: center;">
    Jika anda yang memiliki kesulitan atau pertanyaan perihal Aplikasi ini dapat menghubungi kami
    <br />
    WhatsApp ke <b><a href="tel:6285717175912">+6285717175912</a> </b> , atau email ke <b> <a
        href="mailto:infokizunice@gmail.com"> infokizunice@gmail.com</a></b>
  </p>
</div>

<hr>
  `;

  const emailData = {
    from: '"Kizunice Academy" <infokizunice@gmail.com>',
    to: user.email,
    subject: 'Permintaan password baru',
    html: output,
  };

  try {
    await transporter.sendMail(emailData);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error
  }
};