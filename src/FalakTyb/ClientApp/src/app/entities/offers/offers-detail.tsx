import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from 'google-map-react';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./offers.reducer";
import { getEntitiesproviders } from "../providers/providers.reducer";

export const OffersDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));

    dispatch(getEntitiesproviders({}))
  }, []);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const offersEntity = useAppSelector((state) => state.offers.entity);

  const offerStartDate = new Date(offersEntity.offerStartDate);
 
  const providers = useAppSelector((state) => state.providers.entities);

 

  
  const provider=providers.find(
    (it) => it.id.toString() === offersEntity?.providerId
  )


  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
  const offerStartDateString = days[offerStartDate.getDay()] + ', ' + offerStartDate.getDate() + ' ' + months[offerStartDate.getMonth()] + ', ' + offerStartDate.getFullYear();





  const offerEndDate = new Date(offersEntity.offerStartDate);


  const offerEndDateString = days[offerEndDate.getDay()] + ', ' + offerEndDate.getDate() + ' ' + months[offerEndDate.getMonth()] + ', ' + offerEndDate.getFullYear();
  const offercreationDate = new Date(offersEntity.creationDate);


  const offercreationDateString = days[offercreationDate.getDay()] + ', ' + offercreationDate.getDate() + ' ' + months[offercreationDate.getMonth()] + ', ' + offercreationDate.getFullYear();

  const longitude = parseFloat(offersEntity.longitude);
  const latitude =parseFloat(offersEntity.latitude); 
  const loadMap = (map, maps) => {

if(offersEntity&&providers&&latitude&&longitude){
    const marker = new maps.Marker({
      position: new maps.LatLng(latitude, longitude),
      map,
      draggable: false,
    });
  }

  };



  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-12  mb-10 " style={{ width: "80%" }}>
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1 h-1/4 rounded-md shadow-md">
        
      {offersEntity&&providers&&latitude&&longitude&&<GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' }}
              center={{lat:latitude, lng:longitude}}
                defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
            

            />}
      </div>
      <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
    
      <div className="overflow-hidden sm:rounded-lg"dir="rtl">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900"> تفاصيل الخصم #   {offersEntity.id} </h3>
       
      </div>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">صوره الخصم </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> 
            <div className="h-16 w-16 flex-shrink-0">
                            <img className="h-16 w-16 rounded-sm" src={offersEntity.offerImageUrl} alt="" />
                          </div>
              </dd>
          </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">  الخصم بالإنجليزية </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerNameInEnglish} 
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">  الخصم بالعربي </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerNameInArabic} 
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">  فئة الخصم بالإنجليزية  </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity?.offersCategories?.offerCategorieNameInEnglish} 
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> مقدم خدمة العرض  </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{provider?.providerNameInArabic}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">  فئة الخصم بالعربي   </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity?.offersCategories?.offerCategorieNameInArabic} 
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> نسبة الخصم  </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerAmountPercentage} 
              </dd>
          </div>


          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">تاريخ بدء الخصم  </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offerStartDateString} 
              </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> تاريخ انتهاء الخصم </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offerEndDateString} 
              </dd>
          </div>



          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> تاريخ  الإنشاء   </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offercreationDateString} 
              </dd>
          </div>

          

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
            كود الخصم 
                </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerCode} 
              </dd>
          </div>


          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
العنوان بالإنجليزية               
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.location} 
              </dd>
          </div>



          

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
العنوان بالعربي               
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.locationInArabic} 
              </dd>
          </div>


          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
تفاصيل العرض  بالعربي               
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerDetailsInArabic} 
              </dd>
          </div>




          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
تفاصيل العرض  بالإنجليزية               
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.offerDetailsInEnglish} 
              </dd>
          </div>



          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
رابط موقع العرض
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.websiteUrl} 
              </dd>
          </div>



          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              اضيف بواسطة
 </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {offersEntity.addedBy} 
              </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> هل العرض متوفر على موقع </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {offersEntity.isWebsiteOrApp?<div className=" text-green-400"> نعم</div>:<div className=" text-red-400">لا</div>}
              </dd>
          </div>

          

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> الحالة</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {offersEntity.offerIsValidate ? <div className=" text-green-400">فعال</div> : <div className=" text-red-400">غير فعال</div>}
              </dd>
          </div>








 

     

    


     

      
              
       

           

        
      

       

       

          

       
        </dl>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse mb-8 py-4 ml-4">
        <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/offers"
                replace
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[#909090] shadow-sm px-8 py-2 bg-[#909090] text-base font-medium text-[#ffffff] hover:bg-[#909090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#909090] sm:mt-0 sm:w-auto sm:text-sm"
              >
              رجوع
              </Button>

                  <Button
                     tag={Link}
                     to={`/offers/${offersEntity.id}/edit`}
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

export default OffersDetail;
