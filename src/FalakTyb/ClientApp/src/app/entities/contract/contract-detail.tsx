import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";


import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./contract.reducer";
import { PaperClipIcon } from "@heroicons/react/solid";

export const ContractDetail = (props: RouteComponentProps<{ id: string }>) => {



  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const contractEntity = useAppSelector((state) => state.contract.entity);
  const dateContractStartDate = new Date(contractEntity.contractStartDate);
  const dateContractEndDate = new Date(contractEntity.contractEndDate);
  const dateContractCreation = new Date(contractEntity.creationDate);
  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
  const statedDateString = days[dateContractStartDate.getDay()] + ', ' + dateContractStartDate.getDate() + ' ' + months[dateContractStartDate.getMonth()] + ', ' + dateContractStartDate.getFullYear();
  const endDateString = days[dateContractEndDate.getDay()] + ', ' + dateContractEndDate.getDate() + ' ' + months[dateContractEndDate.getMonth()] + ', ' + dateContractEndDate.getFullYear();
  const DateCreationString = days[dateContractCreation.getDay()] + ', ' + dateContractCreation.getDate() + ' ' + months[dateContractCreation.getMonth()] + ', ' + dateContractCreation.getFullYear();



  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-12  mb-10 " style={{ width: "80%" }}>
    <div className="bg-white  rounded-lg shadow-md overflow-hidden sm:rounded-lg"dir="rtl">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900"> تفاصيل العقد #   {contractEntity.id} </h3>
       
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">مقدم الخدمة باللغة العربي</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {contractEntity.providers
              ? contractEntity.providers.providerNameInArabic
              : ""}
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">مقدم الخدمة باللغة الإنجليزية</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {contractEntity.providers
              ? contractEntity.providers.providerNameInArabic
              : ""}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">رقم الهاتف</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contractEntity.providers
              ? contractEntity.providers.phoneNumber
              : ""}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">البريد الإلكتروني</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{contractEntity.providers
              ? contractEntity.providers.email
              : ""}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">تاريخ إضافة</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{DateCreationString}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">تاريخ بدء العقد</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{statedDateString}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">تاريخ انتهاء العقد </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{endDateString}</dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> الحالة</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

            {contractEntity.status?<div className=" text-green-400">غير منتهي</div>:<div className=" text-red-400">منتهي</div>}


              
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">وصف العقد</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {contractEntity.contractDescription}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">المرفقات</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate">{contractEntity.contarctFileUrl==null||""?"لايوجد ملف":"تم رفع الملف"}</span>
                   
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href={contractEntity.contarctFileUrl} className="font-medium text-[#827349] hover:text-[#827349]">
                    {contractEntity.contarctFileUrl==null||""?"لايوجد ملف":"تحميل"}
                    </a>
                  </div>
                </li>
               
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">اضيف بواسطة</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {contractEntity.providers
              ? contractEntity.providers.addedBy
              : ""
            }
            </dd>
          </div>


        </dl>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse mb-8 py-4 ml-4">
        <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/contract"
                replace
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[#909090] shadow-sm px-8 py-2 bg-[#909090] text-base font-medium text-[#ffffff] hover:bg-[#909090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#909090] sm:mt-0 sm:w-auto sm:text-sm"
              >
              رجوع
              </Button>

                  <Button
                     tag={Link}
                     to={`/contract/${contractEntity.id}/edit`}
                     replace
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
                 
                  >
                    تعديل
                  </Button>
                </div>
      </div>
    </div>
    </div>
  );
};

export default ContractDetail;

