import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat, getSortState } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IPushNotifications } from "app/shared/model/push-notifications.model";
import { getEntities } from "./push-notifications.reducer";
import Pagination from "app/shared/pagination/pagination";
import { DESC, ITEMS_PER_PAGE, SORT } from "app/shared/util/pagination.constants";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { SearchIcon } from "@heroicons/react/solid";

export const PushNotifications = (
  props: RouteComponentProps<{ url: string }>
) => {
  const dispatch = useAppDispatch();
  const [word,setWord] = useState("")
  const pushNotificationsList = useAppSelector(
    (state) => state.pushNotifications.entities
  );
  const loading = useAppSelector((state) => state.pushNotifications.loading);




  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );


  const getEntitiesPushNotifications = () => {
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
    getEntitiesPushNotifications();
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

 

  



  const { match } = props;
  const totalItems = useAppSelector((state) => state.pushNotifications.totalItems);

  const filtered = pushNotificationsList.filter(pushNotifications => {
    return word===""?pushNotifications:pushNotifications.header.startsWith(word)||pushNotifications.details.startsWith(word) ||pushNotifications.sentBy.startsWith(word) ;
  });





  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
    <div className="sm:flex sm:items-center ">
      <div className="mt-4 sm:mt-0 sm:flex-none">
        <Link to="/push-notifications/new"

          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
        >
          + ارسل تنبيه
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
        <h1 className="text-xl font-semibold text-gray-900">التنبيهات</h1>

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
                    عنوان التنبيه                  
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                     نص التنبيه  
                      <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    تاريخ الارسال
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                
         
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                      ارسل بواسطة

                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">

                {filtered.map(Notifications => {

                  const creationDate = new Date(Notifications.sentDate);

                  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                  ];
                  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                  const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();

                  return (
                    <tr key={`entity-${Notifications.id}`} >
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Notifications.header}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Notifications.details}</td>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{creationDateString}</td>   
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Notifications.sentBy}</td>
                   
               
                     
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

export default PushNotifications;
