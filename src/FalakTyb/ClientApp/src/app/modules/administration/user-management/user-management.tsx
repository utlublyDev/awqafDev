import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table, Badge } from "reactstrap";
import {
  Translate,
  TextFormat,
  JhiPagination,
  JhiItemCount,
  getSortState,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT } from "app/config/constants";
import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from "app/shared/util/pagination.constants";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { getUsersAsAdmin, updateUser } from "./user-management.reducer";
import { useAppDispatch, useAppSelector } from "app/config/store";

export const UserManagement = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

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
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = (currentPage) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = (user) => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      })
    );
  };

  const { match } = props;
  const account = useAppSelector((state) => state.authentication.account);
  const users = useAppSelector((state) => state.userManagement.users);
  const totalItems = useAppSelector((state) => state.userManagement.totalItems);
  const loading = useAppSelector((state) => state.userManagement.loading);

  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
      <div className="sm:flex sm:items-center ">
      {/* <div className="mt-4 sm:mt-0 sm:flex-none">
          <Link to="/account/register"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto">
            + اضافة حساب
          </Link>
        </div> */}
        <div className="flex-1 flex items-center justify-center px-2  lg:justify-start">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349]focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
          >
            البحث
          </button> */}
         
        </div>
        <div className="sm:flex-auto text-right">
          <h1 className="text-xl font-semibold text-gray-900"> الحسابات  </h1>

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
                      اسم بالانجليزي                     
                         <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <a href="#" className="group inline-flex">
                      اسم بالعربي                     
                         <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                  
            
                    
                 
                  


                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
 رقم الوظيفي
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a href="#" className="group inline-flex">
                      تاريخ الإنشاء                      
                      
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                        </span>
                      </a>
                    </th>
                   



                  



                 
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                  {users.map(user => {

                    const creationDate = new Date(user.createdDate);

                    const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                    ];
                    const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                    const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();

                    return (
                      <tr key={`entity-${user.id}`} >
  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.firstName}</td>
  
  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.lastName}</td>


                   
                                         
                                         
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.emplyeeCard}</td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{creationDateString}</td>
                       

 
                       
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








    </div>
  );
};

export default UserManagement;
