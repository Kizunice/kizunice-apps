import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req) {
  const profile = await prisma.studentProfile.findMany({
    orderBy : {
      name: "asc"
    }
  });

  //return response JSON
  return NextResponse.json(profile);
}

export async function POST(req,res) {
  const session = await getCurrentUser(req, res);
  console.log(session)
  const body = await req.json();
  const {
    userId,
    image,
    name,
    email,
    phone,
    address,
    gender,
    age,
    dateOfBirth,
    placeOfBirth,
    bodyHeight,
    bodyWeight,
    asalLPK,
    status,
    religion,
    blood,
    smoking,
    drinking,
    paspor,
    jobCompany,
    jobDesc,
    jobYearIn,
    jobYearOut,
    esName,
    esYearIn,
    esYearOut,
    msName,
    msYearIn,
    msYearOut,
    hsName,
    hsYearIn,
    hsYearOut,
    motherName,
    motherAge,
    motherJob,
    fatherName,
    fatherAge,
    fatherJob,
    brotherName,
    brotherAge,
    brotherJob,
  } = body;

  const newDate = new Date(dateOfBirth);

  const newProfile = await prisma.studentProfile.upsert({
    where: {
      userId: session.id ,
    },
    update: {
      name,
      email,
      image,
      phone,
      address,
      gender,
      age: parseInt(age),
      dateOfBirth: newDate.toISOString(),
      placeOfBirth,
      bodyHeight,
      bodyWeight,
      asalLPK,
      status,
      religion,
      blood,
      smoking,
      drinking,
      paspor,
      jobCompany,
      jobDesc,
      jobYearIn : new Date(jobYearIn).toISOString(),
      jobYearOut:  new Date(jobYearOut).toISOString(),
      esName,
      esYearIn,
      esYearOut,
      msName,
      msYearIn,
      msYearOut,
      hsName,
      hsYearIn,
      hsYearOut,
      motherName,
      motherAge,
      motherJob,
      fatherName,
      fatherAge,
      fatherJob,
      brotherName,
      brotherAge,
      brotherJob,
    },
    create: {
      userId: session.id,
      name: name,
      image: image,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
      age: parseInt(age),
      dateOfBirth: newDate.toISOString(),
      placeOfBirth: placeOfBirth,
      bodyHeight: bodyHeight,
      bodyWeight: bodyWeight,
      asalLPK,
      status,
      religion,
      blood,
      smoking,
      drinking,
      paspor,
      jobCompany,
      jobDesc,
      jobYearIn:  new Date(jobYearIn).toISOString(),
      jobYearOut :  new Date(jobYearOut).toISOString(),
      esName,
      esYearIn,
      esYearOut,
      msName,
      msYearIn,
      msYearOut,
      hsName,
      hsYearIn,
      hsYearOut,
      motherName,
      motherAge,
      motherJob,
      fatherName,
      fatherAge,
      fatherJob,
      brotherName,
      brotherAge,
      brotherJob,
    },
  });
  
  const avatar = await prisma.user.update({
    where:{
      id: userId,
    },
    data:{
      image: image
    }
  })
  return NextResponse.json(newProfile, avatar);

}
