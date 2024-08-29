import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer'

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, phone, address, supervisor, country } = body;

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
      role: "PARTNER",
      emailVerifToken : verificationToken
    },
  });

  const profile = await prisma.partnerProfile.create({
    data: {
      userId: user.id,
      name: user.name,
      email: user.email,
      phone,
      address,
      phone, 
      address, 
      supervisor, 
      country,
    },
  });
  await sendVerificationEmail(user)

  return NextResponse.json(user,profile);
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
 
  <p style="font-size:16px;text-align:center">こんにちは ${user.name}</p>

  <p style="font-size:16px;text-align:center">INA NIPPONに登録しました</p>

  <p style="font-size:16px;text-align:center">登録プロセスを続行するには、以下のリンクにアクセスしてメールを確認してください。</p>
  <br />
  <div style="text-align: center;">
    <a class=”link” href="https://ina-nippon.com/email/verify/${user.id}"
      style="background-color:#004421;padding:8px 16px;color:white;text-decoration:none;border-radius:4px">
      メール確認
    </a>
  </div>

  <br />
  <br />
  <br />
  <p style="font-size:15px;text-align: center;">
    このアプリケーションに関して問題や質問がある場合は、お問い合わせください。
    <br />
    WhatsApp ke <b><a href="tel:6285717175912">+6285717175912</a> </b> , atau email ke <b> <a
        href="mailto:info.inanippon@gmail.com"> info.inanippon@gmail.com</a></b>
  </p>
</div>

<hr>
  `;

  const emailData = {
    from: '"INA NIPPON" <info.inanippon@gmail.com>',
    to: user.email,
    subject: 'メール認証',
    html: output,
  };

  try {
    await transporter.sendMail(emailData);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error
  }
};
