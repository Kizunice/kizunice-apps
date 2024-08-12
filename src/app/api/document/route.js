import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import ExcelJS from 'exceljs';
import moment from 'moment';
import { put } from "@vercel/blob";
import { promises as fs } from 'fs';

export async function GET(req) {
  const doc = await prisma.document.findMany({
    include : {
      profile : true
    },
    orderBy : {
      createdAt : 'desc'
    }
  })
  return NextResponse.json(doc);
}

export async function POST(req,res) {
    const body = await req.json();

    const profile = await prisma.studentProfile.findUnique({
        where: {
        id: body.studentId,
        },
    });

    const path = '/api/public/doc/default.xlsx';

    const wb = new ExcelJS.Workbook()

    wb.xlsx.readFile(path)
        .then(async function() {
            let ws = wb.getWorksheet('Sheet1')

            let row2 = ws.getRow(2);
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
            let row16 = ws.getRow(16);
            let row17 = ws.getRow(17);
            let row18 = ws.getRow(18);
            let row20 = ws.getRow(20);
            let row21 = ws.getRow(21);
            let row22 = ws.getRow(22);
            let row24 = ws.getRow(24);
            let row25 = ws.getRow(25);
            let row28 = ws.getRow(28);
            let row29 = ws.getRow(29);
            let row30 = ws.getRow(30);
            let row31 = ws.getRow(31);
            let row32 = ws.getRow(32);
            let row33 = ws.getRow(33);
            let row34 = ws.getRow(34);
            let row36 = ws.getRow(36);

            row2.getCell(3).value = "KIN-001";
            row2.getCell(11).value = "08 - 08 - 2024";
            row4.getCell(3).value = profile.name;
            row5.getCell(3).value = profile.address;
            row6.getCell(3).value = moment(profile.dateOfBirth).format("DD-MM-YYYY");
            row6.getCell(7).value = profile.age;
            row6.getCell(10).value = profile.gender;
            row7.getCell(3).value = profile.phone;
            row7.getCell(7).value = profile.religion;
            row7.getCell(10).value = profile.bodyHeight + " cm";
            row8.getCell(3).value = profile.blood;
            row8.getCell(8).value = profile.shoesSize;
            row8.getCell(10).value = profile.bodyWeight + " kg";
            row8.getCell(12).value = profile.waistLine + " cm";
            row9.getCell(3).value = "";
            row9.getCell(9).value = "";
            row10.getCell(3).value = profile.paspor || "";
            row10.getCell(9).value = "";
            row11.getCell(3).value = "";
            row11.getCell(9).value = "";
            row12.getCell(3).value = "";
            row12.getCell(9).value = " 02/24 ~ 08/24";
            row13.getCell(3).value = "";
            row13.getCell(9).value = profile.asalLPK;
            row20.getCell(1).value = profile.esYearIn + "~" + profile.esYearOut;
            row20.getCell(5).value = profile.esName;
            row21.getCell(1).value = profile.msYearIn + "~" + profile.msYearOut;
            row21.getCell(5).value = profile.msName;
            row22.getCell(1).value = profile.hsYearIn + "~" + profile.hsYearOut;
            row22.getCell(5).value = profile.hsName;
            row24.getCell(1).value = "2020~2024";
            row24.getCell(5).value = profile.jobCompany;
            row25.getCell(1).value = "";
            row25.getCell(5).value = "";
            row28.getCell(3).value = "Bapak";
            row28.getCell(4).value = profile.fatherName;
            row28.getCell(10).value = profile.fatherAge + "歳";
            row28.getCell(11).value = profile.fatherJob;
            row29.getCell(3).value = "Ibu";
            row29.getCell(4).value = profile.motherName;
            row29.getCell(10).value = profile.motherAge + "歳";
            row29.getCell(11).value = profile.motherJob;
            row30.getCell(3).value = "Adik";
            row30.getCell(4).value = profile.brotherName;
            row30.getCell(10).value = profile.brotherAge + "歳";
            row30.getCell(11).value = profile.brotherJob;
            row31.getCell(3).value = "";
            row31.getCell(4).value = "";
            row31.getCell(10).value = "";
            row31.getCell(11).value = "";
            row32.getCell(3).value = "";
            row32.getCell(6).value = "";
            row32.getCell(11).value = "";
            row33.getCell(3).value = profile.smoking;
            row33.getCell(6).value = "";
            row33.getCell(10).value = "";
            row34.getCell(3).value = profile.drinking;
            row34.getCell(6).value = "";
            row34.getCell(10).value = "";
            row36.getCell(1).value = "Tidak";

            row2.commit();
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
            row20.commit()
            row21.commit()
            row22.commit()
            row24.commit()
            row25.commit()
            row28.commit()
            row29.commit()
            row30.commit()
            row31.commit()
            row31.commit()
            row32.commit()
            row33.commit()
            row34.commit()
            row36.commit()

            const buffer = await wb.xlsx.writeBuffer();
            const {url} = await put(`public/doc/CV-${profile.name}.xlsx`, buffer, { access: 'public', addRandomSuffix: false });

            const doc = await prisma.document.create({
              data : {
                link: url,
                profileId : profile.id,
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
