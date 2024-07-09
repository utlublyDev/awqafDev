import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat, getSortState } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IRedeem } from "app/shared/model/redeem.model";
import { getEntities } from "./redeem.reducer";
import { SearchIcon } from "@heroicons/react/solid";
import { DESC, ITEMS_PER_PAGE, SORT } from "app/shared/util/pagination.constants";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { ExportReactCSV } from "app/shared/exportCVS/ExportReactCSV";
import { ExportCSV } from "app/shared/exportCVS/ExportCSV";
import Pagination from "app/shared/pagination/pagination";
import { getEntitiesOffers } from "../offers/offers.reducer";
import { getEntitiesproviders } from "../providers/providers.reducer";

export const Redeem = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const redeemList = useAppSelector((state) => state.redeem.entities);
  const loading = useAppSelector((state) => state.redeem.loading);

  useEffect(() => {
    dispatch(getEntities({}));
    dispatch(getEntitiesOffers({}))
    dispatch(getEntitiesproviders({}))
    
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };


  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );


  const getEntitiesRedeem = () => {
    dispatch(
      getEntities({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${DESC}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${DESC}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };
  useEffect(() => {
    dispatch(
      getEntities({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${DESC}`,
      })
    );


    
getEntitiesRedeem();
  }, [pagination.activePage,DESC, pagination.sort]);



  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get("page");
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(",");
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = (p) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === DESC ? DESC : DESC,
      sort: p,
    });

  const handlePagination = (currentPage) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

 






  const { match } = props;
  const totalItems = useAppSelector((state) => state.reviewsAndRating.totalItems)
  const providers = useAppSelector((state) => state.providers.entities);
  const users = useAppSelector((state) => state.userManagement.users);

  const offersList = useAppSelector((state) => state.offers.entities);








  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
  

    <div className="sm:flex sm:items-center ">
 
      <div className="flex-1 flex items-center justify-center px-2  lg:justify-start">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349]focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
        >
          البحث
        </button>
        <div className="max-w-lg w-full lg:max-w-xs ml-3 mt-5">

          <label htmlFor="search" className="sr-only text-right">
            البحث
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-[#9D8D60]" aria-hidden="true" />
            </div>
            <input
              dir="rtl"
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border-transparent bg-white rounded-lg shadow-sm   placeholder-gray-500   sm:text-sm placeholder:text-left"
              placeholder="البحث"
              type="search"
            />
          </div>
        </div>
      
      </div>
  
      <div className="sm:flex-auto text-right">
        <h1 className="text-xl font-semibold text-gray-900"> تقرير استخدام العروض</h1>

      </div>

    </div>
   
    <div className=" flex flex-col border-transparent shadow-md " dir="rtl" >
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>

                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" className="group inline-flex">
                    اسم الموظف                     
                     <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>

                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" className="group inline-flex">
                    مقدم الخدمة                      
                     <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                     الخصم                     
                     <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    كود الخصم               
                         <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
             
         
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    عدد الاستخدام 
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                

                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    تاريخ الاستخدام                       
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">


                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {<ExportCSV csvData={redeemList} fileName={'تقرير'} />}


               
                  </th>
            


                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">

                {redeemList.map(redeem => {
                    const creationDate = new Date(redeem.date);
                 
                    const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                    ];
                    const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                    const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();


 const provider=providers.find(
  (it) => it.id.toString() === redeem.providerId.toString()
)
const offer=offersList.find(
  (it) => it.id.toString() === redeem.offerId.toString()
)
const awqafUsers=users.find(
  (it) => it.id.toString() === redeem.userId.toString()
)

                  return (
                    <tr key={`entity-${redeem.id}`} >
                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{"awqaf Users"}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer!==undefined?offer&&offer.offerNameInArabic:"تم الحذف"}</td>  
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{provider!==undefined?provider&&provider.providerNameInArabic:"تم الحذف"}</td> 
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{redeem.code}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{redeem.countCode}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{creationDateString}</td>
                 
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                    
                  
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>






    <Pagination
      postsPerPage={ITEMS_PER_PAGE}
      totalPosts={totalItems}
      paginate={handlePagination}
    />


  </div>
  );
};

export default Redeem;
