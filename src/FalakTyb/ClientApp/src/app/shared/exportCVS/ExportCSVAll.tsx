import React from 'react'

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useAppSelector } from 'app/config/store';

export const ExportCSVAll = ({csvData, fileName}) => {
 
 
    const contractList = useAppSelector((state) => state.contract.entities);

//here to find ex contract 
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    const last30DaysDateTime = last30DaysDate.getTime();
    const today = new Date();
    const contractsEndDate = contractList?.filter((contract) => {
      const contractEndDates = new Date(contract?.contractEndDate);
      return today > contractEndDates
    });



//total numbers  

const totalItemsOffer = useAppSelector((state) => state.offers.totalItems);
const totalItemsNewCompany = useAppSelector((state) => state.newCompany.totalItems);
const totalItemsProvder = useAppSelector((state) => state.providers.totalItems);
//most wanted 

const redeemList = useAppSelector((state) => state.redeem.entities);






  const DataToExportRedeem = [];
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    redeemList.forEach((redeem)=>{
   
                     
      DataToExportRedeem.push({مقدم_الخدمة:redeem.serviceProviderName,عدد_الاستخدام:redeem.count })
     

    })
    const DataToExportContractsEndDate = [];
   contractsEndDate.forEach((Contract) => {
      const creationDate = new Date(Contract.contractEndDate);
                     
      const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
      const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();
      DataToExportContractsEndDate.push({رقم_العقد:Contract.id,مقدم_الخدمة:Contract.providers.providerNameInArabic,تاريخ_انتهاء_العقد:creationDateString})        
    })
const Number = [{عدد_مقدمي_الخصم:totalItemsProvder,عدد_الخصومات:totalItemsOffer,عدد_الشركات:totalItemsNewCompany}]


  




    const exportCSVAll = (csvData2, fileName2) => {
      const ws = XLSX.utils.json_to_sheet(DataToExportRedeem);
      const ws2 = XLSX.utils.json_to_sheet(DataToExportContractsEndDate);
      const ws3 = XLSX.utils.json_to_sheet(Number);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "الاكثر طلباً");
      XLSX.utils.book_append_sheet(wb, ws2, "العقود المنتهية");
      XLSX.utils.book_append_sheet(wb, ws3, "احصائيات");
         //XLSX.writeFile(wb, "sheetjs.xlsx");
       
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

   




        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button 
        className="whitespace-nowrap px-3 py-4 text-sm text-[#827349] underline text-right"      
          onClick={(e) => exportCSVAll(csvData,fileName)}>تحميل التقرير</button>
    )
}