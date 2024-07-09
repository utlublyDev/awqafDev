import React from 'react'

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useAppSelector } from 'app/config/store';

export const ExportCSV = ({csvData, fileName}) => {
 
    const providers = useAppSelector((state) => state.providers.entities);
    const users = useAppSelector((state) => state.userManagement.users);
  
    const offersList = useAppSelector((state) => state.offers.entities);
  
  const DataToExport = [];
  
  csvData&&offersList&&providers&&csvData.forEach((redeem)=>{
    const provider=providers.find(
      (it) => it.id.toString() === redeem.providerId.toString()
    )
    const offer=offersList.find(
      (it) => it.id.toString() === redeem.offerId.toString()
    )
    const awqafUsers=users.find(
      (it) => it.id.toString() === redeem.userId.toString()
    )
    const creationDate = new Date(redeem.date);
                   
    const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
    const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();
    DataToExport.push(provider!==undefined&&offer!==undefined&&{الموظف:"awqaf Users",مقدم_الخدمة:providers&&provider.providerNameInArabic,الخصم:offersList&&offer.offerNameInArabic,كود_الخصم:redeem.code,عدد_الاستخدام:redeem.countCode,تاريخ_الاستخدام:creationDateString })
   
  })

  csvData = DataToExport;

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData2, fileName2) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button 
        className="whitespace-nowrap px-3 py-4 text-sm text-[#827349] underline"      
          onClick={(e) => exportToCSV(csvData,fileName)}>تحميل التقرير</button>
    )
}