import React from 'react';

import { Link, useHistory } from "react-router-dom";
function DashboardCardReviews({reviewsAndRatingList}, props) {
  const history = useHistory();
 
  return (
    <>
    <header className="px-5 py-4 border-b border-slate-100 flex   justify-between">
        
        <a href='/reviews-and-rating' className="font-light text-[#909090] text-right text-sm ">  جميع تقييمات</a>
        <h2 className="  font-extrabold  text-[#1A1A1A]"> تقييمات الموظفين</h2>
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
                  <div className="font-semibold text-center text-[#909090]">التقييم </div>
                </th>
               
              
                <th className="p-3 whitespace-nowrap">
                  <div className="font-semibold   text-right mr-10 text-[#909090]">اسم الموظف</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                reviewsAndRatingList.slice(0, 5).map(Rating => {
                
                 
 





                  return (
                 
                    <tr  key={Rating.id}  className="p-2 rounded-md group  hover:shadow-lg " >
 
                      <td className="p-3 whitespace-nowrap">
                        <div className="  flex justify-center">

                        {[...new Array(Rating.rating)].map((arr, index) => {
                            return <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16.642" height="16" viewBox="0 0 16.642 16"  >
                              <path id="star" d="M13.409,16.122,8.258,12.336,3.107,16.122l1.978-6.114L-.063,6.246H6.293L8.258.122l1.965,6.124h6.355l-5.148,3.762Z" transform="translate(0.063 -0.122)" fill="#909090" />
                            </svg>
                          })}


                          </div>
                      </td>
                    
                     
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex    justify-end">
                         
                          <div className="font-medium text-slate-800 mt-2 mr-5">{Rating.userIdAwqaf}</div>
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={"./../../content/images/user-36-05.png"} width="40" height="40" alt={Rating.userIdAwqaf} />
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

export default DashboardCardReviews;