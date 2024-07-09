import React from 'react';



function DashboardCardRedeem({redeemList}) {



  return (
    <>
    <header className="px-5 py-4 border-b border-slate-100 flex   justify-between">
        
    <a href='/redeem' className="font-light text-[#909090] text-right text-sm ">جميع </a>
        <h2 className="     font-extrabold  text-[#1A1A1A]">  الاكثر طلبا</h2>
      </header>
    <div className="  bg-white rounded-lg shadow-md ">
   
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase  ">
              <tr>
                <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-center text-[#909090]">عدد الاستخدام</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                <div className="font-semibold   text-right mr-10 text-[#909090]">مقدم الخدمة</div>
                </th>
             
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                redeemList.slice(0, 5).map(redeem => {
                  return (
                    <tr key={redeem.id}>
                     
                  
      
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-center">{redeem.count}</div>
                      </td>
                      
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex    justify-end">
                         
                          <div className="font-medium text-slate-800 mt-2 mr-5">{redeem.serviceProviderName}</div>
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={redeem.serviceProviderImage} width="40" height="40" alt={redeem.serviceProviderImage} />
                          </div>
                        </div>
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

export default DashboardCardRedeem;