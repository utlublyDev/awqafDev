import React from 'react';

import { Link, useHistory } from "react-router-dom";
function DashboardCardContract({contractList}, props) {
  const history = useHistory();
  
  return (
    <>
    <header className="px-5 py-4 border-b border-slate-100 flex   justify-between">
        
        <a href='/contract' className="font-light text-[#909090] text-right text-sm ">جميع العقود</a>
        <h2 className="  font-extrabold  text-[#1A1A1A]">حالة العقود</h2>
      </header>
    <div className="  bg-white rounded-lg shadow-md  ">
      
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase ">
              <tr>
                <th className="p-3 whitespace-nowrap">
                  <div className="font-semibold text-center text-[#909090]">تاريخ انتهاء العقد</div>
                </th>
                <th className="p-3 whitespace-nowrap">
                  <div className="font-semibold text-center text-[#909090]">الحالة</div>
                </th>
                <th className="p-3 whitespace-nowrap">
                  <div className="font-semibold text-center text-[#909090]">مقدم الخدمة</div>
                </th>
                <th className="p-3 whitespace-nowrap">
                  <div className="font-semibold text-center text-[#909090]">رقم العقد</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                contractList.slice(0, 13).map(contract => {
                
                 
    


 const date = new Date(contract.contractEndDate);
const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];
const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
const delDateString = days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();


                  return (
                 
                    <tr onClick={() => history.push(`/contract/${contract.id}`)} key={contract.id}  className="hover:bg-[#F7F7F7] p-2 rounded-md group cursor-pointer hover:shadow-lg " >
 
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-center">{delDateString}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {contract.status?<div className="text-center font-medium text-green-400">غير منتهي</div>:<div className="text-center font-medium text-red-400">منتهي</div>}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-center">{contract.providers.providerNameInArabic}</div>
                      </td>
                     
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-base text-center font-light text-[#505050]">{contract.id} </div>
                      </td>
                   
                    </tr>
                 
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
    </>
  );
}

export default DashboardCardContract;