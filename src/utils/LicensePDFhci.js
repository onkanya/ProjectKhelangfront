/* eslint-disable */
import axios from 'axios'
import { BAHTTEXT } from '@/utils/bathToText'
import moment from 'moment'
import crute from '@/assets/crute'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    THSarabun: {
        normal: 'THSarabun.ttf',
        bold: 'THSarabun Bold.ttf',
        italics: 'THSarabun Italic.ttf',
        bolditalics: 'THSarabun Bold Italic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

export async function GetLCforPDF (LCid) {
    const res = await axios.get('http://localhost:5003/getlicense/' + LCid)
    let licensePDF = res.data[0]
    let addressO = {}
    let addressC = {}
    const resODid = await axios.get('http://localhost:5003/getdistrict/' + licensePDF.ODid)
    addressO.districtO = resODid.data[0].Dname_th
    const resOSDTid = await axios.get('http://localhost:5003/getsubdistrict/' + licensePDF.OSDTid)
    addressO.subdistrictO = resOSDTid.data[0].SDTname_th
    const resOPid = await axios.get('http://localhost:5003/getprovince/' + licensePDF.OPid)
    addressO.provinceO = resOPid.data[0].Pname_th
    const resCDid = await axios.get('http://localhost:5003/getdistrict/' + licensePDF.CDid)
    addressC.districtC = resCDid.data[0].Dname_th
    const resCSDTid = await axios.get('http://localhost:5003/getsubdistrict/' + licensePDF.CSDTid)
    addressC.subdistrictC = resCSDTid.data[0].SDTname_th
    const resCPid = await axios.get('http://localhost:5003/getprovince/' + licensePDF.CPid)
    addressC.provinceC = resCPid.data[0].Pname_th
    printPDF(licensePDF, addressO, addressC)
}

function printPDF(licensePDF, addressO, addressC) {
    var docDefinition = {
        info: {
            title: `ใบอนุญาติหมายเลข ${licensePDF.LCnolicense}`,
            author: 'Khelang',
            subject: `${licensePDF.LCnolicense}`,
            keywords: '...',
        },
        pageMargins: [ 80, 80, 50, 60 ],
        content: [
            { image: crute, width: 70, style: 'centerme' },
            { text: `(ด้านหน้า)\nเลขที่ ${licensePDF.LCnolicense}`, fontSize: 16, style: 'rightme', absolutePosition: {x: 0, y: 100} },
            { text: `\nใบอนุญาตประกอบ${licensePDF.CTname}`, fontSize: 18, style: ['centerme', 'boldme'] },
            { text: `เทศบาลเมืองเขลางค์นคร`, fontSize: 18, style: ['centerme', 'boldme'] },
            { fontSize: 16,
                text: [
                    { text: `\n        (๑) เจ้าพนักงานท้องถิ่นอนุญาตให้`,preserveLeadingSpaces: true },
                    { text: `   ${licensePDF.Oname}  `, style: 'content'},
                    `สัญชาติ`,
                    { text: `  ${licensePDF.Onationality}  `, style: 'content'},
                    `อยู่บ้านเลขที่`,
                    { text: `  ${licensePDF.Ohomeno}  `, style: 'content'},
                    `หมู่ที่`,
                    { text: `   ${licensePDF.Omoo}   `, style: 'content'},
                    `ตรอก/ซอย`,
                    { text: `     ${licensePDF.Osoi}     `, style: 'content'},
                    `ถนน`,
                    { text: `     ${licensePDF.Oroad}     `, style: 'content'},
                    `ตำบล`,
                    { text: `     ${addressO.subdistrictO}     `, style: 'content'},
                    `อำเภอ`,
                    { text: `     ${addressO.districtO}     `, style: 'content'},
                    `จังหวัด`,
                    { text: `     ${addressO.provinceO}     `, style: 'content'},
                    `\nโทรศัพท์`,
                    { text: `   ${licensePDF.Otel}   `, style: 'content'},
                ] 
            },
            {
                fontSize: 16,
                text: [
                    { text: `        ชื่อสถานประกอบ${licensePDF.CTname}`, preserveLeadingSpaces: true},
                    { text: ` ประเภท`, preserveLeadingSpaces: true},
                    { text: `   ${licensePDF.LFname} (${licensePDF.Cnoted})   `, style: 'content'},
                    { text: `โดยใช้ชื่อสถานประกอบกิจการว่า`},
                    { text: `     ${licensePDF.Cname}     `, style: 'content'},
                    { text: `ตั้งอยู่เลขที่`},
                    { text: `   ${licensePDF.Chomeno}   `, style: 'content'},
                    { text: `หมู่ที่`},
                    { text: `   ${licensePDF.Cmoo}   `, style: 'content'},
                    { text: `ตรอก/ซอย `},
                    { text: `   ${licensePDF.Csoi}   `, style: 'content'},
                    { text: `ถนน`},
                    { text: `   ${licensePDF.Croad}   `, style: 'content'},
                    { text: `ตำบล`},
                    { text: `   ${addressC.subdistrictC}   `, style: 'content'},
                    { text: `อำเภอ`},
                    { text: `   ${addressC.districtC}   `, style: 'content'},
                    { text: ` จังหวัด`},
                    { text: `   ${addressC.provinceC}   `, style: 'content'},
                    { text: `\nโทรศัพท์`},
                    { text: `   ${licensePDF.Ctel}   `, style: 'content'},
                    { text: `มีพื้นที่ประกอบการ`},
                    { text: `   ${licensePDF.Carea}   `, style: 'content'},
                    { text: `ตารางเมตร ใช้เครื่องจักรขนาด`},
                    { text: `   ${licensePDF.Cmachine}   `, style: 'content'},
                    { text: `แรงม้า จำนวนคนงาน`},
                    { text: `   ${licensePDF.Cemployee}   `, style: 'content'},
                    { text: `คน`}
                ]
            },
            {
                fontSize: 16,
                text: [
                    { text: `ทั้งนี้ได้เสียค่าธรรมเนียมใบอนุญาตปีละ`},
                    { text: `   ${licensePDF.LFfee}   `, style: 'content'},
                    { text: `บาท`},
                    { text: `   (${BAHTTEXT(licensePDF.LFfee)})   `, style: 'content'},
                    { text: `\nตามใบเสร็จรับเงิน เล่มที่`},
                    { text: `   ${licensePDF.LCreceiptno}   `, style: 'content'},
                    { text: `ลงวันที่`},
                    { text: `   ${moment(licensePDF.LCreceiptdate).format('DD')}   `, style: 'content'},
                    { text: `เดือน`},
                    { text: `   ${numberToMonth(moment(licensePDF.LCreceiptdate).format('MM'))}   `, style: 'content'},
                    { text: `พ.ศ.`},
                    { text: `   ${moment(licensePDF.LCreceiptdate).format('YYYY')}   `, style: 'content'}
                ]
            },
            { text: `        (๒) ผู้รับใบอนุญาตต้องปฏิบัติตามหลักเกณฑ์ วิธีการและเงื่อนไขที่กําหนดในเทศบัญญัติ`, fontSize: 16, preserveLeadingSpaces: true },
            { text: `เทศบาลเมืองเขลางค์นคร เรื่อง${licensePDF.CTname} พ.ศ. 2559`, fontSize: 16, preserveLeadingSpaces: true },
            { text: `        (๓) หากปรากฏในภายหลังว่าการประกอบกิจการที่ได้รับอนุญาตนี้เป็นการขัดต่อกฎหมายอื่นที่เกี่ยวข้อง โดยมิอาจแก้ไขได้ เจ้าพนักงานท้องถิ่นอาจพิจารณาให้เพิกถอนการอนุญาตนี้ได้`, fontSize: 16, preserveLeadingSpaces: true },
            {
                fontSize: 16,
                text: [
                    { text: `\n        ใบอนุญาตฉบับนี้ออกให้เมื่อวันที่`, preserveLeadingSpaces: true},
                    { text: `   ${moment(licensePDF.LCstartdate).format('DD')}   `, style: 'content'},
                    { text: `เดือน`},
                    { text: `   ${numberToMonth(moment(licensePDF.LCstartdate).format('MM'))}   `, style: 'content'},
                    { text: `พ.ศ.`},
                    { text: `   ${moment(licensePDF.LCstartdate).add(543, 'years').format('YYYY')}   `, style: 'content'}
                ]
            },
            {
                fontSize: 16,
                text: [
                    { text: `        ใบอนุญาตนี้สิ้นอายุวันที่`, preserveLeadingSpaces: true},
                    { text: `   ${moment(licensePDF.LCexpiredate).format('DD')}   `, style: 'content'},
                    { text: `เดือน`},
                    { text: `   ${numberToMonth(moment(licensePDF.LCexpiredate).format('MM'))}   `, style: 'content'},
                    { text: `พ.ศ.`},
                    { text: `   ${moment(licensePDF.LCexpiredate).add(543, 'years').format('YYYY')}   `, style: 'content'}
                ]
            },
            { text: `\n\n                                               (ลงชื่อ)`, fontSize: 16, preserveLeadingSpaces: true },
            {
                fontSize: 16,
                text: [
                    { text: `                                                       (`, fontSize: 16, preserveLeadingSpaces: true},
                    { text: `   ${licensePDF.BName}   `, style: 'content'},
                    { text: `)`},
                ]
            },
            {
                fontSize: 16,
                text: [
                    { text: `                                               ตำแหน่ง`, preserveLeadingSpaces: true },
                    { text: `  ${licensePDF.BPosition}   `, style: 'content'}
                ]
            },
            {
                fontSize: 14,
                text: [
                    { text: `\nคำเตือน`, decoration: 'underline' },
                    { text: `        (๑) ผู้รับใบอนุญาตต้องแสดงใบอนุญาตนี้โดยเปิดเผยและเห็นง่าย ณ สถานประกอบกิจการตลอดเวลา`, preserveLeadingSpaces: true },
                    { text: `\n                 ที่ประกอบกิจการ หากฝ่าฝืนมีโทษปรับไม่เกิน ๕๐๐ บาท`, preserveLeadingSpaces: true },
                    { text: `\n                 (๒) หากประสงค์จะประกอบกิจการในปีต่อไปต้องยื่นคําขออนุญาตก่อนใบอนุญาตสิ้นอายุ`, preserveLeadingSpaces: true },
                ]
            },
        ],
        styles: {
            centerme: {
                alignment: 'center'
            },
            rightme: {
                alignment: 'right'
            },
            boldme: {
                bold: true
            },
            content: {
                decoration: 'underline',
                decorationStyle: 'dotted',
                preserveLeadingSpaces: true 
            }
        },
        defaultStyle: {
            font: 'THSarabun'
        }
    };
    pdfMake.createPdf(docDefinition).open()
}

function numberToMonth (month) {
    let text = ''
    switch (month) {
        case '01' : 
            text = 'มกราคม'
            break
        case '02' :
            text = 'กุมภาพันธ์'
            break
        case '03' :
            text = 'มีนาคม'
            break
        case '04' :
            text = 'เมษายน'
            break
        case '05' :
            text = 'พฤษภาคม'
            break
        case '06' :
            text = 'มิถุนายน'
            break
        case '07' :
            text = 'กรกฎาคม'
            break
        case '08' :
            text = 'สิงหาคม'
            break
        case '09' :
            text = 'กันยายน'
            break
        case '10' :
            text = 'ตุลาคม'
            break
        case '11' :
            text = 'พฤศจิกายน'
            break
        case '12' :
            text = 'ธันวาคม'
            break
        default:
            text = 'ไม่พบเดือน'
            break
    }
    return text
}
