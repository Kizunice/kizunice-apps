import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import ExcelJS from 'exceljs';
import moment from 'moment';
import 'moment/locale/ja';
import { put } from "@vercel/blob";
import fs from 'fs'
import path from 'path'

export async function GET(req) {
  const doc = await prisma.document.findMany({
    orderBy : {
      createdAt : 'desc'
    },
    include : {
      student : true,
      staff : true
    }
  })
  return NextResponse.json(doc);
}

export async function POST(req,res) {
    const body = await req.json();
    const session = await getCurrentUser(req, res);

    const profile = await prisma.studentProfile.findUnique({
        where: {
          id: body.studentId,
        },
    });

    const staff = await prisma.staffProfile.findUnique({
      where: {
        userId: session.id,
      },
    });
   
    const filePath = path.resolve('./public', 'doc', `${body.name}`);
    
    const wb = new ExcelJS.Workbook()
    
    await wb.xlsx.readFile(filePath)
        .then(async function() {
            let ws = wb.getWorksheet('Sheet1')
            let row1 = ws.getRow(1);
            let row2 = ws.getRow(2);
            let row3 = ws.getRow(3);
            let row4 = ws.getRow(4);
            let row5 = ws.getRow(5);
            let row6 = ws.getRow(6);
            let row7 = ws.getRow(7);
            let row8 = ws.getRow(8);
            let row9 = ws.getRow(9);
            let row10 = ws.getRow(10);
            let row11 = ws.getRow(11);
            let row12 = ws.getRow(12);
            let row13 = ws.getRow(13);
            let row14 = ws.getRow(14);
            let row15 = ws.getRow(15);
            let row17 = ws.getRow(17);
            let row19 = ws.getRow(19);
            let row20 = ws.getRow(20);
            let row21 = ws.getRow(21);
            let row22 = ws.getRow(22);
            let row24 = ws.getRow(24);
            let row25 = ws.getRow(25);
            let row26 = ws.getRow(26);
            let row27 = ws.getRow(27);
            let row28 = ws.getRow(28);
            let row29 = ws.getRow(29);
            let row30 = ws.getRow(30);
            let row31 = ws.getRow(31);
            let row32 = ws.getRow(32);
            let row33 = ws.getRow(33);
            let row34 = ws.getRow(34);
            let row36 = ws.getRow(36);
            let row38 = ws.getRow(38);

            if(profile.image) {
              const imageId = wb.addImage({
                buffer: profile.image,
                extension: 'jpg',
              });
              ws.addImage(imageId, 'K3:L7')
            }
           
            
            row1.getCell(16).value = moment().format('YYYY年MM月D日');
            row2.getCell(16).value = "INA-XXX";
            row4.getCell(5).value = profile.nihongoName;
            row5.getCell(5).value = profile.name;
            row6.getCell(5).value = profile.address;
            row7.getCell(5).value = moment(profile.dateOfBirth).format('YYYY年MM月D日');
            row7.getCell(10).value = profile.age;
            row7.getCell(13).value = profile.gender;
            row8.getCell(5).value = profile.placeOfBirth;
            row8.getCell(10).value = profile.religion;
            row8.getCell(13).value = profile.bodyHeight;
            row9.getCell(5).value = profile.blood;
            row9.getCell(8).value = profile.status === "Lajang" ? "未婚" : "";
            row9.getCell(11).value = "無";
            row9.getCell(13).value = profile.bodyWeight;
            row9.getCell(17).value = profile.paspor;
            row10.getCell(5).value = profile.desease ? "" : "無";
            row10.getCell(11).value = profile.drinking ? "" : "無";
            row10.getCell(15).value = profile.smoking ? "" : "無";
            row11.getCell(12).value = profile.drinkingPerWeek;
            row11.getCell(16).value = profile.smokingPerWeek;

            row13.getCell(5).value = moment(profile.esYearIn).format("YYYY年 MM月");
            row13.getCell(8).value = moment(profile.esYearOut).format("YYYY年 MM月");
            row13.getCell(11).value = profile.esName;
            row14.getCell(5).value = moment(profile.msYearIn).format("YYYY年 MM月");
            row14.getCell(8).value = moment(profile.msYearOut).format("YYYY年 MM月");
            row14.getCell(11).value = profile.msName;
            row15.getCell(5).value = moment(profile.hsYearIn).format("YYYY年 MM月");
            row15.getCell(8).value = moment(profile.hsYearOut).format("YYYY年 MM月");
            row15.getCell(11).value = profile.hsName;
            row17.getCell(5).value = moment(profile.jobYearIn).format("YYYY年 MM月");
            row17.getCell(8).value = moment(profile.jobYearOut).format("YYYY年 MM月");

            row17.getCell(10).value = profile.jobCompany;
            row17.getCell(13).value = profile.jobDesc;
            row19.getCell(8).value = profile.studyMonth;

            row24.getCell(3).value = profile.fatherName;
            row24.getCell(10).value = profile.fatherAge;
            row24.getCell(12).value = profile.fatherJob;
            row25.getCell(3).value = profile.motherName;
            row25.getCell(10).value = profile.motherAge;
            row25.getCell(12).value = profile.motherJob;
            row26.getCell(3).value = profile.brotherName;
            row26.getCell(10).value = profile.brotherAge;
            row26.getCell(12).value = profile.brotherJob;
            row27.getCell(3).value = profile.brother2Name;
            row27.getCell(10).value = profile.brother2Age;
            row27.getCell(12).value = profile.brother2Job;

            row30.getCell(10).value = profile.savingAmount;
            row32.getCell(10).value = profile.savingGoal;
            row34.getCell(10).value = profile.specialSkill;
            row36.getCell(10).value = profile.acquintance;
            row38.getCell(10).value = profile.aboutMe;
            
            row1.commit();
            row2.commit();
            row3.commit();
            row4.commit();
            row5.commit()
            row6.commit()
            row7.commit()
            row8.commit()
            row9.commit()
            row10.commit()
            row11.commit()
            row12.commit()
            row13.commit()
            row14.commit()
            row15.commit()
            row17.commit()
            row19.commit()
            row24.commit()
            row25.commit()
            row26.commit()
            row27.commit()
            row30.commit()
            row32.commit()
            row34.commit()
            row36.commit()
            row38.commit()

            const buffer = await wb.xlsx.writeBuffer();
            const {url} = await put(`public/doc/CV-${profile.name}.xlsx`, buffer, { access: 'public', addRandomSuffix: false });

            const doc = await prisma.document.create({
              data : {
                link: url,
                name: body.name,
                studentId : profile.id,
                staffId : staff.id,
                created : true
              }
            })
            return NextResponse.json(doc)

        })
        .catch(err => {
            console.log(err.message);
        });

      return NextResponse.json({
        status: 'success',
      });
      
}
