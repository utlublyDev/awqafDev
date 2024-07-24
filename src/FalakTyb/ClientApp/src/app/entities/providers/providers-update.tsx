import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, FormText } from "reactstrap";

import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";
import { useAppDispatch, useAppSelector } from "app/config/store";

import GoogleMapReact from 'google-map-react';

import { IProvidersCategories } from "app/shared/model/providers-categories.model";
import { getEntities as getProvidersCategories } from "app/entities/providers-categories/providers-categories.reducer";
import { IProviders } from "app/shared/model/providers.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
  getEntitiesproviders,
} from "./providers.reducer";
import { setLocale } from "app/shared/reducers/locale";
import axios from "axios";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}









export const ProvidersUpdate = (props: RouteComponentProps<{ id: string }>) => {


  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const account = useAppSelector((state) => state.authentication.account);

  const providersCategories = useAppSelector(
    (state) => state.providersCategories.entities
  );
  const providersEntity = useAppSelector((state) => state.providers.entity);
  const providers = useAppSelector((state) => state.providers.entities);
  const [show, setShow] = useState(false)
  const loading = useAppSelector((state) => state.providers.loading);
  const updating = useAppSelector((state) => state.providers.updating);
  const [active, SetActive] = useState(false)
  const [isholding, SetIsHolding] = useState(false)
  const [isVipProvider, SetIsVipProvider] = useState(false)

  const updateSuccess = useAppSelector(
    (state) => state.providers.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/providers");
  };



  const isCheckedisActive = providersEntity?.isActive;

  const isCheckedItWillHaveSubProviders = providersEntity?.itWillHaveSubProviders;


  const isCheckedIsVip = providersEntity?.isVip;


  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
    SetIsHolding(isCheckedItWillHaveSubProviders)
    SetIsVipProvider(isCheckedIsVip)
    SetActive(isCheckedisActive)
    dispatch(getProvidersCategories({}));
    dispatch(getEntitiesproviders({}))
  }, [isCheckedisActive, isCheckedItWillHaveSubProviders, isCheckedIsVip]);

  const longitude = providersEntity&& parseFloat(providersEntity.longitude);
  const latitude =  providersEntity&& parseFloat(providersEntity.latitude);


  const [location, setLocation] = useState({lat:latitude,lng:longitude});

  function _onClick(obj) { setLocation({ lat: obj.lat, lng: obj.lng }); }
//file handeling 

const[animation,setAnimation] = useState(false)
const[nameFile,setNameFile] = useState("")
const[statusFile,setStatusFile] = useState(false)
const [selectedFile, setSelectedFile] = useState();
const [isFilePicked, setIsFilePicked] = useState(false);
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
const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setNameFile(event.target.files[0].name);
  setIsFilePicked(true);
};

const handleSubmission = (e) => {
  setAnimation(true)
  const formData = new FormData();
  e.preventDefault();
  formData.append('image', selectedFile);

  fetch(
    'https://file.engineeric.qa/engineeric/fileSystem',
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





  const loadMap  = (map, maps) => {

    if(isNew){
            const marker = new maps.Marker({
              position: new maps.LatLng( 25.286106 , 51.534817),
              map,
        
              draggable: true,
            });
        
          }
          if(!isNew&&longitude&&latitude&&providersEntity)
          {
    
            const marker = new maps.Marker({
              position: new maps.LatLng(parseFloat(providersEntity.latitude), parseFloat(providersEntity.longitude ) ),
              //center:new maps.LatLng( latitude ,longitude),
    
              map,
        
              draggable: true,
            });
      
          
          }
    
    
    
          };
  

          useEffect(() => {
        
            setLocation({ lat: isNew ? 25.286106 : latitude, lng: isNew ? 51.534817 : longitude })
            //const onGoogleApiLoaded=({ map, maps }) => loadMap(map, maps)
          }, [latitude,longitude]);


  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {

    values.isActive = active;
    values.isWeChooseForYou = false;
    values.isVip = isVipProvider;
    values.itWillHaveSubProviders = isholding;
    values.addedBy = account?.login;
    values.creationDate = new Date();
    values.providerCode= Math.floor(1000 + Math.random() * 9000);
    values.latitude = location.lat.toString();
    values.longitude = location.lng.toString();
    values.providerImageUrl = isNew?`${SERVER_API_URL}/get/fileData?FileName=`+nameFile:nameFile===""?providersEntity.providerImageUrl:`${SERVER_API_URL}/api/AwqafFiles/get/fileData?FileName=`+nameFile;
    const entity = {
      ...providersEntity,
      ...values,
      providersCategories: providersCategories.find(
        (it) => it.id.toString() === values.providersCategories.toString()
      ),
      providers: providers.find(
        (it) => it.id.toString() === !show ? values.mainServiceProviderId.toString() : "null"
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
      ? {}
      : {
        ...providersEntity,
        providersCategories: providersEntity?.providersCategories?.id,
        providers: providersEntity?.mainServiceProviderId,
  
      };








  return (

    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-12  mb-10 " style={{ width: "80%" }}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 h-1/4 ">
          <div className="px-4 py-5 sm:px-6">
            <h5 className="text-md leading-6  text-gray-900 text-right">حدد العنوان في الخريطة </h5>

          </div>

          <div style={{ height: '400px', width: '100%' }}>
          {isNew ? <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCq6Gfa49xNDja8vAqDK0HuvGxT7u5pBlc' }}
              defaultCenter={{ lat: 25.286106, lng: 51.534817 }}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
              onClick={_onClick}

            /> : longitude&&latitude&&providersEntity&&<GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCq6Gfa49xNDja8vAqDK0HuvGxT7u5pBlc' }}
              center={{ lat:parseFloat(providersEntity.latitude), lng: parseFloat(providersEntity.longitude )}}
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

            {loading && providers && providersEntity ? (
              <p>Loading...</p>
            ) : (
              <ValidatedForm className="grid grid-cols-6 gap-6"
                defaultValues={defaultValues()}
                onSubmit={saveEntity}
              >

                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"اسم مقدم الخدمة  بالإنجليزية "}
                  id="providers-providerNameInEnglish"
                  name="providerNameInEnglish"
                  data-cy="providerNameInEnglish"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />
                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"اسم مقدم الخدمة  بالعربي"}
                  id="providers-providerNameInArabic"
                  name="providerNameInArabic"
                  data-cy="providerNameInArabic"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />


             



                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"عنوان مقدم خدمة بالإنجليزية"}
                  id="providers-address"
                  name="address"
                  data-cy="address"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />



                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={" عنوان مقدم خدمة بالعربي"}
                  id="providers-addressInArabic"
                  name="addressInArabic"
                  data-cy="addressInArabic"
                  type="text"
                />
                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-2 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"رقم الاتصال"}
                  id="providers-phoneNumber"
                  name="phoneNumber"
                  data-cy="phoneNumber"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />
                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-2 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"البريد الإلكتروني"}
                  id="providers-email"
                  name="email"
                  data-cy="email"
                  type="text"
                />

                <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-2 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"رابط موقع الإلكتروني لموفر الخدمة"}
                  id="providers-websiteUrl"
                  name="websiteUrl"
                  data-cy="websiteUrl"
                  type="text"
                />








<ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"رابط  منصة الفيسبوك"}
                  id="providers-facebookUrl"
                  name="facebookUrl"
                  data-cy="facebookUrl"
                  type="text"
                />

<ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"رابط   منصة الانستغرام"}
                  id="providers-instagramUrl"
                  name="instagramUrl"
                  data-cy="instagramUrl"
                  type="text"
                />

                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"كلمات البحث بالعربية "}
                  id="providers-keyWordsInArabic"
                  name="keyWordsInArabic"
                  data-cy="keyWordsInArabic"
                  rows={3}
                  type="textarea"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                />
                <div className="col-span-6 sm:col-span-6 lg:col-span-6 -mt-10 mr-3  ">
                  <p className="  text-xs text-gray-600 text-right"> الرجاء فصل كل كلمة بفاصلة</p>
                </div>
                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"كلمات البحث بالإنجليزية "}
                  id="providers-keyWordsInEnglish"
                  name="keyWordsInEnglish"
                  data-cy="keyWordsInEnglish"
                  rows={3}
                  type="textarea"
                />
                <div className="col-span-6 sm:col-span-6 lg:col-span-6 -mt-10 mr-3  ">
                  <p className="  text-xs text-gray-600 text-right"> الرجاء فصل كل كلمة بفاصلة</p>
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
                          defaultChecked={active}
                          onChange={() => SetActive(!active)}



                          className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                        />
                      </div>
                      <div className="-ml-16 text-sm">
                        <label htmlFor="active" className="font-medium text-gray-700">
                          تفعيل مقدم الخدمة
                        </label>
                        <p id="active" className="text-gray-500">

                          عند تفعيل مقدم الخدمه سوف يتم اظهاره في البرنامج
                        </p>

                      </div>
                    </div>

                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isholding"
                          aria-describedby="isholding"
                          name="isholding"
                          type="checkbox"
                          defaultChecked={isholding}
                          onChange={() => SetIsHolding(!isholding)}


                          className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                        />
                      </div>
                      <div className="-ml-16 text-sm">
                        <label htmlFor="isholding" className="font-medium text-gray-700">
                          هل  مقدم الخدمه هو شركه قابضه
                        </label>
                        <p id="isholding" className="text-gray-500">

                          عند التفعيل سوف يكون من قائمة الشركات القابضه
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isVipProvider"
                          aria-describedby="isVipProvider"
                          name="isVipProvider"
                          type="checkbox"

                          defaultChecked={isVipProvider}
                          onChange={() => SetIsVipProvider(!isVipProvider)}
                          className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                        />
                      </div>
                      <div className="-ml-16 text-sm">
                        <label htmlFor="isVipProvider" className="font-medium text-gray-700">
                          هل هو مقدم خدمة متميز
                        </label>
                        <p id="isVipProvider" className="text-gray-500">

                          عند التفعيل سوف يكون من قائمة  مقدم خدمات المميزه
                        </p>
                      </div>
                    </div>



                  </fieldset>
                </div>










                {!isholding && <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  id="providers-mainServiceProviderId"
                  name="mainServiceProviderId"
                  data-cy="mainServiceProviderId"
                  label={" مقدم الخدمة رئيسي"}
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
                </ValidatedField>}



                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  id="providers-providersCategories"
                  name="providersCategories"
                  data-cy="providersCategories"
                  label={"فئة مزود الخدمة "}
                  type="select"
                  validate={{
                    required: {
                      value: true,
                      message: translate("entity.validation.required"),
                    },
                  }}
                >
                  <option value="0">اختر فئة مزود الخدمة</option>

                  {providersCategories
                    ? providersCategories.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.providersCategorieNameInArabic}
                      </option>
                    ))
                    : null}
                </ValidatedField>

                <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                  label={"ملاحظات"}
                  id="providers-note"
                  name="note"
                  data-cy="note"
                  rows={3}
                  type="textarea"
                />
                <div className="col-span-6 sm:col-span-6 lg:col-span-6 -mt-10 mr-3  ">
                  <p className="  text-xs text-gray-600 text-right">اكتب بعض الملاحظات ان وجدت.
                  </p>
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-6">

<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5  mt-8 " dir="rtl">

  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
ارفاق شعار مزود الخدمة  </label>
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
            <input type="file"  accept="image/png" onChange={handleFileChange} />
          </label>

        </div>
        <p className="text-xs text-gray-500"> PDF UP to 2MB  {nameFile}</p>
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
                    disabled={isNew&&!statusFile}

                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
                  // onClick={confirmDelete}
                  >
                        {animation?"رفع..":"حفظ"}
                  </Button>
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
                </div>





              </ValidatedForm>
            )}








          </div>
        </div>
      </div>
    </div>


  );
};

export default ProvidersUpdate;
