import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { getSortState } from "react-jhipster";


import { useAppDispatch, useAppSelector } from "app/config/store";


import { getEntities } from "./contract.reducer";


import {
  ChevronLeftIcon, ChevronRightIcon,
  SearchIcon,

} from '@heroicons/react/solid'
import Pagination from "app/shared/pagination/pagination";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "app/shared/util/pagination.constants";
export const Contract = (props: RouteComponentProps<{ url: string }>) => {
  const { match } = props;

  const dispatch = useAppDispatch();

  const contractList = useAppSelector((state) => state.contract.entities);
  const loadingcontrac = useAppSelector((state) => state.contract.loading);
const [word,setWord] = useState("")

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );


  const getEntitiesContract = () => {
    dispatch(
      getEntities({
        page: pagination.activePage - 1,
        size: word===""?pagination.itemsPerPage:10000,
        sort: `${pagination.sort},${DESC}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${DESC}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getEntitiesContract();
  }, [pagination.activePage,DESC, pagination.sort,word]);

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

  const handleSyncList = () => {
    getEntitiesContract();
  };






  const filtered = contractList.filter(contract => {
    return word===""?contract:contract.id.toString() === word||contract.providers.providerNameInArabic.startsWith(word);
  });



  const totalItems = useAppSelector((state) => state.contract.totalItems);


  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
      <div className="sm:flex sm:items-center ">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <Link to="/contract/new"

            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
          >
            + اضافة عقد جديد
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-2  lg:justify-start">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349]focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
          >
            البحث
          </button> */}
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
                onChange={(e) => {setWord(e.target.value)}}
               
              />
            </div>
          </div>
        </div>
        <div className="sm:flex-auto text-right">
          <h1 className="text-xl font-semibold text-gray-900">العقود</h1>

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
                        رقم العقد
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        مقدم الخدمة
                        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        رقم الاتصال
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        تاريخ بدء العقد
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        تاريخ انتهاء العقد
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        الحالة
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        ملف العقد
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                        أضيف بواسطة

                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                  
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                  {filtered.map(contract => {

                    const dateContractStartDate = new Date(contract.contractStartDate);
                    const dateContractEndDate = new Date(contract.contractEndDate);
                    const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                    ];
                    const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                    const delDateString = days[dateContractStartDate.getDay()] + ', ' + dateContractStartDate.getDate() + ' ' + months[dateContractStartDate.getMonth()] + ', ' + dateContractStartDate.getFullYear();
                    const endDateString = days[dateContractEndDate.getDay()] + ', ' + dateContractEndDate.getDate() + ' ' + months[dateContractEndDate.getMonth()] + ', ' + dateContractEndDate.getFullYear();
                    return (
                      <tr key={`entity-${contract.id}`} >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {contract.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contract.providers.providerNameInArabic}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contract.contactNumber}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{delDateString}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{endDateString}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {contract.status?<div className=" text-green-400">غير منتهي</div>:<div className=" text-red-400">منتهي</div>}

                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#827349] underline">
                        <div className="ml-4 flex-shrink-0">
                    {/* <a href={contract.contarctFileUrl} className="font-medium text-[#827349] hover:text-[#827349]">
                    {contract.contarctFileUrl==null||""?"لايوجد ملف":"تحميل"}
                    </a> */}
                    <button onClick={()=>{

const link = document.createElement('a');
link.href = contract.contarctFileUrl; // Replace with the actual file URL
const searchParams = new URLSearchParams(new URL(contract.contarctFileUrl).search);
const fileName = searchParams.get('FileName');
// Set the file name
link.download = fileName; // Replace with the desired file name

// Simulate a click on the anchor element to start the download
link.click();


                    }}>
  {contract.contarctFileUrl==null||""?"لايوجد ملف":"تحميل"}
                    </button>
                  </div>
                          
                         
                          
                          
                          </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contract.providers.addedBy}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link to={`/contract/${contract.id}`} className="text-[#827349] hover:text-[#827349]">
                            عرض<span className="sr-only"></span>
                          </Link>
                          <Link to={`/contract/${contract.id}/edit`} className="text-[#827349] hover:text-[#827349] mr-5 ml-5">
                            تعديل  <span className="sr-only"></span>
                          </Link>
                          <Link to={`/contract/${contract.id}/delete`} className="text-[#827349] hover:text-[#827349] ">
                            حدف  <span className="sr-only"></span>
                          </Link>
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
      </div>






      <Pagination
        postsPerPage={ITEMS_PER_PAGE}
        totalPosts={totalItems}
        paginate={handlePagination}
      />

    </div>

  );
};

export default Contract;
