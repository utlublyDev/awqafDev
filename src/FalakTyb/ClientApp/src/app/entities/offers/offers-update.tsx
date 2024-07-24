import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { Button, Row, Col, FormText } from "reactstrap";
import axios from "axios";

import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from 'google-map-react';

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";
import { useAppDispatch, useAppSelector } from "app/config/store";
import dayjs from "dayjs";
import { IOffersCategories } from "app/shared/model/offers-categories.model";
import { getEntities as getOffersCategories } from "app/entities/offers-categories/offers-categories.reducer";
import { IOffers } from "app/shared/model/offers.model";
import { getEntity, updateEntity, createEntity, reset } from "./offers.reducer";
import {
  getEntitiesproviders,
} from "../providers/providers.reducer"
export const OffersUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const offersCategories = useAppSelector(
    (state) => state.offersCategories.entities
  );
  const offersEntity = useAppSelector((state) => state.offers.entity);
  const loading = useAppSelector((state) => state.offers.loading);
  const updating = useAppSelector((state) => state.offers.updating);
  const updateSuccess = useAppSelector((state) => state.offers.updateSuccess);
  const providers = useAppSelector((state) => state.providers.entities);
  const account = useAppSelector((state) => state.authentication.account);

  const [startOfferDate, setStartOfferDate] = useState(null);
  const [endOfferDate, setEndOfferDate] = useState(null);
  const [offerIsValidate, SetOfferIsValidate] = useState(false)
  const [isWebsiteOrApp, SetIsWebsiteOrApp] = useState(false)
  const handleClose = () => {
    props.history.push("/offers");
  };

  const StartDate = isNew ? dayjs(new Date()).format('YYYY-MM-DD').toString() : offersEntity && dayjs(offersEntity.offerStartDate).format('YYYY-MM-DD').toString()
  const EndDate = isNew ? dayjs(new Date()).format('YYYY-MM-DD').toString() : offersEntity && dayjs(offersEntity.offerEndDate).format('YYYY-MM-DD').toString();
  const isCheckedIsValidate = offersEntity?.offerIsValidate;
  const isCheckedIsOfferInWeb = offersEntity?.isWebsiteOrApp;
  const longitude = offersEntity && parseFloat(offersEntity.longitude);
  const latitude = offersEntity && parseFloat(offersEntity.latitude);


  const [location, setLocation] = useState({ lat: latitude, lng: longitude });

  function _onClick(obj) { setLocation({ lat: obj.lat, lng: obj.lng }); }


  const loadMap = (map, maps) => {

    if (isNew) {
      const marker = new maps.Marker({
        position: new maps.LatLng(25.286106, 51.534817),
        map,

        draggable: true,
      });

    }
    if (!isNew && longitude && latitude && offersEntity) {

      const marker = new maps.Marker({
        position: new maps.LatLng(parseFloat(offersEntity.latitude), parseFloat(offersEntity.longitude)),


        map,

        draggable: true,
      });


    }



  };


  useEffect(() => {

    setLocation({ lat: isNew ? 25.286106 : latitude, lng: isNew ? 51.534817 : longitude })
  }, [latitude, longitude]);


  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {


      dispatch(getEntity(props.match.params.id));

    }

    dispatch(getOffersCategories({}));
    dispatch(getEntitiesproviders({}));
    setStartOfferDate(StartDate)
    setEndOfferDate(EndDate)
    SetOfferIsValidate(isCheckedIsValidate)
    SetIsWebsiteOrApp(isCheckedIsOfferInWeb)
  }, [StartDate, EndDate, isCheckedIsValidate, isCheckedIsOfferInWeb, longitude, latitude]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  //file handler 

  const [animation, setAnimation] = useState(false)
  const [nameFile, setNameFile] = useState("")
  const [statusFile, setStatusFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setNameFile(event.target.files[0].name);
    setIsFilePicked(true);
  };
  const handleFileChange =  (event) => {
    const chosenFile = event.target.files[0];
    setSelectedFile(chosenFile);

    handleFileUpload(event.target.files[0])

  };

  const handleFileUpload = (file) => {
    setAnimation(true)
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post(`${SERVER_API_URL}/api/AwqafFiles`, formData)
        .then((response) => {
          // Handle the response from the server
          const newFileName = response.data.replace("falaktayab/", "");
          setNameFile(newFileName)
          setStatusFile(true)
          setAnimation(false)
        })
        .catch((error) => {
          // Handle any errors that occur during the upload
          console.error(error);
        });
    }
  };

  const handleSubmission = (e) => {
    setAnimation(true)
    const formData = new FormData();
    e.preventDefault();
    formData.append('image', selectedFile);

    fetch(
      'https://awqaf.engineeric.qa/engineeric/fileSystem',
      {
        method: 'POST',
        body: formData,
        redirect: 'follow',
        mode: 'no-cors'
      }
    )
      .then((response) => response.text())
      .then((result) => {
        setStatusFile(true)
        setAnimation(false)
      })
      .catch((error) => {
        //console.error('Error:', error);
      });
  };





  const saveEntity = (values) => {
    values.offerStartDate = startOfferDate
    values.offerEndDate = endOfferDate
    values.creationDate = new Date();
    values.latitude = location.lat.toString();
    values.longitude = location.lng.toString();
    values.offerIsValidate = offerIsValidate
    values.isWebsiteOrApp = isWebsiteOrApp

    values.offerImageUrl = isNew ? `${SERVER_API_URL}/api/AwqafFiles/get/fileData?FileName=` + nameFile : nameFile === "" ? offersEntity.offerImageUrl : `${SERVER_API_URL}/api/AwqafFiles/get/fileData?FileName=` + nameFile;

    values.addedBy = account?.login;
    const entity = {
      ...offersEntity,
      ...values,
      offersCategories: offersCategories.find(
        (it) => it.id.toString() === values.offersCategories.toString()
      ),
      providers: providers.find(
        (it) => it.id.toString() === values.providerId.toString()
      ),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {

      }
      : {
        ...offersEntity,
        offersCategories: offersEntity?.offersCategories?.id,
        providers: offersEntity?.providerId,



      };



  const today = new Date().toISOString().split('T')[0];


  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-12  mb-10 " style={{ width: "80%" }}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 h-1/4 ">
          <div className="px-4 py-5 sm:px-6">
            <h5 className="text-md leading-6  text-gray-900 text-right">حدد العنوان في الخريطة </h5>

          </div>

          <div style={{ height: '400px', width: '100%' }}>
            {isNew ? <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' }}
              defaultCenter={{ lat: 25.286106, lng: 51.534817 }}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
              onClick={_onClick}

            /> : longitude && latitude && offersEntity && <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' }}
              center={{ lat: parseFloat(offersEntity.latitude), lng: parseFloat(offersEntity.longitude) }}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
              onClick={_onClick}

            />}
          </div>


        </div>
        <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">

          <div className="overflow-hidden sm:rounded-lg">

            <div className="mb-7">

              <h3 className="text-lg  leading-6 text-[#909090] text-right flex justify-end   font-bold">


                إضافة / تعديل التفاصيل
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="ml-3">
                  <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090" />
                </svg>

              </h3>
            </div>

            {loading && offersEntity && offersCategories ? (
              <p>Loading...</p>
            ) : (
              <ValidatedForm className="grid grid-cols-6 gap-6"
                defaultValues={defaultValues()}
                onSubmit={saveEntity}
              >

                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"الخصم  بالإنجليزية "}
                  id="offers-offerNameInEnglish"
                  name="offerNameInEnglish"
                  data-cy="offerNameInEnglish"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />
                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={" الخصم بالعربي"}
                  id="offers-offerNameInArabic"
                  name="offerNameInArabic"
                  data-cy="offerNameInArabic"

                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />





                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"العنوان بالعربي"}
                  id="offers-location"
                  name="location"
                  data-cy="location"
                  type="text"
                />

                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"العنوان بالإنجليزية"}
                  id="offers-locationInArabic"
                  name="locationInArabic"
                  data-cy="locationInArabic"
                  type="text"
                />

                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"تفاصيل العرض بالإنجليزية"}
                  id="offers-offerDetailsInEnglish"
                  name="offerDetailsInEnglish"
                  data-cy="offerDetailsInEnglish"
                  rows={3}
                  type="textarea"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />


                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"تفاصيل العرض بالعربي"}
                  id="offers-offerDetailsInArabic"
                  name="offerDetailsInArabic"
                  data-cy="offerDetailsInArabic"
                  rows={3}
                  type="textarea"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />
                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"نسبة الخصم"}
                  id="offers-offerAmountPercentage"
                  name="offerAmountPercentage"
                  data-cy="offerAmountPercentage"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                    validate: (v) =>
                      isNumber(v) || translate("entity.validation.number"),
                  }}
                />

                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="contract-end-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
                    تاريخ انتهاء العرض
                  </label>
                  <input

                    defaultValue={endOfferDate}
                    onChange={(e) => { setEndOfferDate(e.target.value) }}
                    id="contract-end-Date"
                    name="contract-end-Date"
                    type="date"
                    min={startOfferDate}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                  <label htmlFor="contract-Start-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
                    تاريخ بدء العرض
                  </label>
                  <input
                    defaultValue={startOfferDate}
                    id="contract-start-Date"
                    name="contract-start-Date"
                    type="date"
                    required
                    min={today}
                    onChange={(e) => { setStartOfferDate(e.target.value) }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
                  />
                </div>




                <div className="col-span-6 sm:col-span-6 lg:col-span-6" dir="rtl">

                  <fieldset className="space-y-5 -ml-16 mt-5 mb-10">

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="active"
                          aria-describedby="active"
                          name="active"
                          type="checkbox"
                          defaultChecked={offerIsValidate}
                          onChange={() => SetOfferIsValidate(!offerIsValidate)}



                          className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                        />
                      </div>
                      <div className="-ml-16 text-sm">
                        <label htmlFor="active" className="font-medium text-gray-700">
                          تفعيل الخصم

                        </label>
                        <p id="active" className="text-gray-500">

                          عند تفعيل  الخصم سوف يتم اظهاره في البرنامج
                        </p>

                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isWebsiteOrApp"
                          aria-describedby="isWebsiteOrApp"
                          name="isWebsiteOrApp"
                          type="checkbox"
                          defaultChecked={isWebsiteOrApp}
                          onChange={() => SetIsWebsiteOrApp(!isWebsiteOrApp)}
                          className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                        />
                      </div>
                      <div className="-ml-16 text-sm">
                        <label htmlFor="isWebsiteOrApp" className="font-medium text-gray-700">
                          هل العرض متوفر على موقع
                        </label>
                        <p id="isWebsiteOrApp" className="text-gray-500">
                          عند التفعيل سوف يتم عرض الرابط العرض في البرنامج </p>
                      </div>
                    </div>
                  </fieldset>
                </div>




                {isWebsiteOrApp && <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"

                  label={"رابط موقع الالكتروني للعرض"}
                  id="offers-websiteUrl"
                  name="websiteUrl"
                  data-cy="websiteUrl"
                  type="text"
                />}


                {isWebsiteOrApp && <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"كود الخصم   "}
                  id="offers-offerCode"
                  name="offerCode"
                  data-cy="offerCode"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />}





                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  id="offers-offersCategories"
                  name="offersCategories"
                  data-cy="offersCategories"
                  label={"فئة الخصم"}
                  type="select"
                >
                  <option value="">اختر   فئة  العرض  </option>
                  {offersCategories
                    ? offersCategories.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.offerCategorieNameInEnglish}
                      </option>
                    ))
                    : null}
                </ValidatedField>


                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  id="offers-providerId"
                  name="providerId"
                  data-cy="providerId"
                  label={"مقدم خدمة العرض"}
                  type="select"

                >
                  <option value={""}>اختر مقدم الخدمة</option>
                  {providers
                    ? providers.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.providerNameInArabic}
                      </option>
                    ))
                    : null}
                </ValidatedField>






                <div className="col-span-6 sm:col-span-6 lg:col-span-6">

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5  mt-8 " dir="rtl">

                
                  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    ارفاق صورة الخصم
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 ml-1">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer w-1/2 bg-white rounded-sm font-medium text-[#827349] hover:text-[#827349] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#505050]"
                          >
                            {/* <span>اختر الملف</span> */}
                            <input type="file" accept="image/png" onChange={handleFileChange} />
                          </label>

                        </div>
                        <p className="text-xs text-gray-500"> PNG UP to 2MB  {nameFile}</p>
                        <div className="flex text-sm ">
                          {animation && <div className="flex items-center justify-center space-x-2 animate-bounce">
                            <div className="w-3 h-3 bg-[#827349]  rounded-full"></div>
                            <div className="w-3 h-3 bg-[#827349] hite rounded-full"></div>
                            <div className="w-3 h-3 bg-[#827349] rounded-full"></div>

                          </div>}


                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>



                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse  py-4 ml-4 flex justify-end">
                  <Button

                    id="save-entity"
                    data-cy="entityCreateSaveButton"
                    type="submit"
                    disabled={isNew && !statusFile}

                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
                  // onClick={confirmDelete}
                  >
                    حفظ
                  </Button>
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
                </div>





              </ValidatedForm>
            )}








          </div>
        </div>
      </div>
    </div>






  );
};

export default OffersUpdate;
