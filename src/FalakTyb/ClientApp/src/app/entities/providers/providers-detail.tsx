import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GoogleMapReact from 'google-map-react';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntitiesproviders, getEntity } from "./providers.reducer";

export const ProvidersDetail = (props: RouteComponentProps<{ id: string }>) => {


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));


  }, []);
  const providersEntity = useAppSelector((state) => state.providers.entity);

  const providers = useAppSelector((state) => state.providers.entities);

  const providerMain=providersEntity&&providers.find(
    (it) => it.id.toString() === providersEntity?.mainServiceProviderId?.toString()
  )

  const longitude = parseFloat(providersEntity.longitude);
  const latitude =parseFloat(providersEntity.latitude); 
  const loadMap = (map, maps) => {

if(providersEntity&&providers&&latitude&&longitude){
    const marker = new maps.Marker({
      position: new maps.LatLng(latitude, longitude),
      map,
      draggable: false,
    });
  }

  };

  const dateContractCreation = new Date(providersEntity.creationDate);
  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
  const DateCreationString = days[dateContractCreation.getDay()] + ', ' + dateContractCreation.getDate() + ' ' + months[dateContractCreation.getMonth()] + ', ' + dateContractCreation.getFullYear();
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-12  mb-10 " style={{ width: "80%" }}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 h-1/4 rounded-md shadow-md">

        {providersEntity&&providers&&latitude&&longitude&&<GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' }}
              center={{lat:latitude, lng:longitude}}
                defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
            

            />}
        </div>
        <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">

          <div className="overflow-hidden sm:rounded-lg" dir="rtl">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900"> تفاصيل  مقدم الخدمة #   {providersEntity.id}</h3>

            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">الشعار</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="h-16 w-16 flex-shrink-0">
                  <img className="h-16 w-16 rounded-sm" src={providersEntity.providerImageUrl} alt="" />
                </div>
              </dd>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> اسم مقدم الخدمة  بالعربي </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.providerNameInArabic}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> اسم مقدم الخدمة  بالإنجليزية </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.providerNameInEnglish}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">  فئة مزود الخدمة بالإنجليزية </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.providersCategories?.providersCategorieNameInEnglish}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">  فئة مزود الخدمة بالعربي </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity?.providersCategories?.providersCategorieNameInArabic}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">رقم الهاتف</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.phoneNumber}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">البريد الإلكتروني</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.email}
                  </dd>
                </div>


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> رابط الموقع</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.websiteUrl}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> رابط  منصة الفيسبوك</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.facebookUrl}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">رابط   منصة الانستغرام</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.instagramUrl}
                  </dd>
                </div>


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">كود الخصم مقدم الخدمة</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.providerCode}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">عنوان مقدم خدمة بالإنجليزية </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.address}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">عنوان مقدم خدمة بالعربي </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.addressInArabic}
                  </dd>
                </div>




            

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> هل هو مقدم خدمة متميز</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                    {providersEntity.isWeChooseForYou ? <div className=" text-green-400"> نعم</div> : <div className=" text-red-400">لا</div>}

                  </dd>
                </div>


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">  هل  مقدم الخدمه هو شركه قابضه</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {providersEntity.itWillHaveSubProviders ? <div className=" text-green-400"> نعم</div> : <div className=" text-red-400">لا</div>}

                  </dd>
                </div>

                {providersEntity.itWillHaveSubProviders && <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> موفر خدمة الرئيسي    </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {providerMain&&providerMain.providerNameInArabic?providerMain.providerNameInArabic:"لايوجد"}
                  </dd>
                </div>}


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> كلمات البحث بالعربية</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {providersEntity.keyWordsInArabic}

                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">كلمات البحث بالإنجليزية</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {providersEntity.keyWordsInEnglish}

                  </dd>
                </div>



                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> الحالة</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {providersEntity.isActive ? <div className=" text-green-400"> فعال</div> : <div className=" text-red-400">غير فعال</div>}

                  </dd>
                </div>


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ملاحظات</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.note}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">أضيف بواسطة</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {providersEntity.addedBy}
                  </dd>
                </div>


                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500"> تاريخ الإنشاء</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {DateCreationString}
                  </dd>
                </div>

              </dl>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse mb-8 py-4 ml-4">
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/providers"
                replace
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[#909090] shadow-sm px-8 py-2 bg-[#909090] text-base font-medium text-[#ffffff] hover:bg-[#909090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#909090] sm:mt-0 sm:w-auto sm:text-sm"
              >
              رجوع
              </Button>

                  <Button
                     tag={Link}
                     to={`/providers/${providersEntity.id}/edit`}
                     replace
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
                 
                  >
                    تعديل
                  </Button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProvidersDetail;
