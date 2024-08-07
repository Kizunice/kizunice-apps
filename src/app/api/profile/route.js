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
    studyMonth,
    status,
    religion,
    blood,
    shoesSize,
    teesSize,
    waistLine,
    smoking,
    drinking,
    paspor,
    jobCompany,
    jobDesc,
    jobYearIn,
    jobYearOut,
    job2Company,
    job2Desc,
    job2YearIn,
    job2YearOut,
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
    brother2Name,
    brother2Age,
    brother2Job,
    brother3Name,
    brother3Age,
    brother3Job,
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
      dateOfBirth: dateOfBirth ? newDate.toISOString() : null,
      placeOfBirth,
      bodyHeight,
      bodyWeight,
      asalLPK,
      studyMonth,
      status,
      religion,
      blood,
      shoesSize,
      teesSize,
      waistLine,
      smoking,
      drinking,
      paspor,
      jobCompany,
      jobDesc,
      jobYearIn : jobYearIn ? new Date(jobYearIn).toISOString() : null,
      jobYearOut: jobYearOut ? new Date(jobYearOut).toISOString() : null,
      job2Company,
      job2Desc,
      job2YearIn : job2YearIn ? new Date(job2YearIn).toISOString() : null,
      job2YearOut : job2YearOut ?new Date(job2YearOut).toISOString() : null,
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
      brother2Name,
      brother2Age,
      brother2Job,
      brother3Name,
      brother3Age,
      brother3Job,
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
      dateOfBirth: dateOfBirth ? newDate.toISOString() : null,
      placeOfBirth: placeOfBirth,
      bodyHeight: bodyHeight,
      bodyWeight: bodyWeight,
      asalLPK,
      studyMonth,
      status,
      religion,
      blood,
      shoesSize,
      teesSize,
      waistLine,
      smoking,
      drinking,
      paspor,
      jobCompany,
      jobDesc,
      jobYearIn : jobYearIn ? new Date(jobYearIn).toISOString() : null,
      jobYearOut: jobYearOut ? new Date(jobYearOut).toISOString() : null,
      job2Company,
      job2Desc,
      job2YearIn : job2YearIn ? new Date(job2YearIn).toISOString() : null,
      job2YearOut : job2YearOut ?new Date(job2YearOut).toISOString() : null,
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
      brother2Name,
      brother2Age,
      brother2Job,
      brother3Name,
      brother3Age,
      brother3Job,
    },
  });

  if (image) {
    await prisma.user.update({
      where:{
        id: userId,
      },
      data:{
        image: image
      }
    })
  }
  
  return NextResponse.json(newProfile);

}
