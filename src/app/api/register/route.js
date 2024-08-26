import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer'    

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = generateEmailVerificationToken();

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      emailVerifToken : verificationToken
    },
  });

  if(user) {
    await sendVerificationEmail(user)
  }

  return new NextResponse('User Created');
}

const generateEmailVerificationToken = () => {
  return randomBytes(32).toString('hex')
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

const sendVerificationEmail = async (user) => {

  const output = `
  <div style="background-color: white;padding: 1rem; max-width: 40rem;margin: auto;">
 
  <p style="font-size:16px;text-align:center">Halo ${user.name}</p>

  <p style="font-size:16px;text-align:center">Kamu telah melakukan pendaftaran di INA App</p>

  <p style="font-size:16px;text-align:center">Untuk melanjutkan proses pendaftaran, silahkan konfirmasi email kamu
    dengan kunjungi link di bawah ini</p>
  <br />
  <div style="text-align: center;">
    <a class=”link” href="https://kizunice-apps.vercel.app/email/verify/${user.id}"
      style="background-color:#004421;padding:8px 16px;color:white;text-decoration:none;border-radius:4px">
      Konfirmasi email
    </a>
  </div>

  <br />
  <br />
  <br />
  <p style="font-size:15px;text-align: center;">
    Jika anda yang memiliki kesulitan atau pertanyaan perihal Aplikasi ini dapat menghubungi kami
    <br />
    WhatsApp ke <b><a href="tel:6285717175912">+6285717175912</a> </b> , atau email ke <b> <a
        href="mailto:info.inaapp@gmail.com"> info.inaapp@gmail.com</a></b>
  </p>
</div>

<hr>
  `;

  const emailData = {
    from: '"INA APP" <info.inaapp@gmail.com>',
    to: user.email,
    subject: 'Verifikasi Email Pendaftaran',
    html: output,
  };

  try {
    await transporter.sendMail(emailData);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error
  }
};