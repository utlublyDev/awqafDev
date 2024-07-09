import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat, getSortState } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IProvidersCategories } from "app/shared/model/providers-categories.model";
import { getEntities } from "./providers-categories.reducer";
import Pagination from "app/shared/pagination/pagination";
import { DESC, ITEMS_PER_PAGE, SORT } from "app/shared/util/pagination.constants";
import { SearchIcon } from "@heroicons/react/solid";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";

export const ProvidersCategories = (
  props: RouteComponentProps<{ url: string }>
) => {
  const dispatch = useAppDispatch();
  const [word,setWord] = useState("")
  const providersCategoriesList = useAppSelector(
    (state) => state.providersCategories.entities
  );
  const loading = useAppSelector((state) => state.providersCategories.loading);

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );


  const getEntitiesProvidersCategories = () => {
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
    getEntitiesProvidersCategories();
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
  


  const totalItems = useAppSelector((state) => state.providersCategories.totalItems);

  const { match } = props;

  
  
  const filtered = providersCategoriesList.filter(providersCategories => {
    return word===""?providersCategories:providersCategories.providersCategorieNameInArabic.startsWith(word)||providersCategories.providersCategorieNameInEnglish.startsWith(word);
  });




  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
    <div className="sm:flex sm:items-center ">
      <div className="mt-4 sm:mt-0 sm:flex-none">
        <Link to="/providers-categories/new"

          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
        >
          + اضافة فئه جديده
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
        <h1 className="text-xl font-semibold text-gray-900">فئات مقدم الخدمة</h1>

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
                    أيقونة الفئة
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
اسم الفئة بالعربي                    
  <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    اسم الفئة بالانجليزي                    
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    الفئة هل سيكون لديها شركات قابضة 
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
                    أضيف بواسطة
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

                {filtered.map(providersCategorie => {

                  const creationDate = new Date(providersCategorie.creationDate);
            
                  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                  ];
                  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
                  const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();

                  return (
                    <tr key={`entity-${providersCategorie.id}`} >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={providersCategorie.providersCategorieIconUrl} alt="" />
                          </div>


                     
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{providersCategorie.providersCategorieNameInArabic}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{providersCategorie.providersCategorieNameInEnglish}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {providersCategorie.itWillHaveHoldingCompaniesb?<div className=" text-green-400">نعم</div>:<div className=" text-red-400">لا</div>}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{providersCategorie.status?<div className=" text-green-400">فعال</div>:<div className=" text-red-400">غير فعال</div>}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{providersCategorie.addedBy}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#827349] underline">{creationDateString}</td>
              
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`/providers-categories/${providersCategorie.id}`} className="text-[#827349] hover:text-[#827349]">
                          عرض<span className="sr-only"></span>
                        </Link>
                        <Link to={`/providers-categories/${providersCategorie.id}/edit`} className="text-[#827349] hover:text-[#827349] mr-5 ml-5">
                          تعديل  <span className="sr-only"></span>
                        </Link>
                        <Link to={`/providers-categories/${providersCategorie.id}/delete`} className="text-[#827349] hover:text-[#827349] ">
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

export default ProvidersCategories;
