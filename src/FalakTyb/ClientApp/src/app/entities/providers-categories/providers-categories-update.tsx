import React, { useState, useEffect, useRef } from "react";
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

import { IProvidersCategories } from "app/shared/model/providers-categories.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./providers-categories.reducer";
import { useForm } from "react-hook-form";
import { Switch } from "@headlessui/react";

export const ProvidersCategoriesUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const providersCategoriesEntity = useAppSelector(
    (state) => state.providersCategories.entity
  );
  const loading = useAppSelector((state) => state.providersCategories.loading);

  const account = useAppSelector((state) => state.authentication.account);


  const updating = useAppSelector(
    (state) => state.providersCategories.updating
  );
  const updateSuccess = useAppSelector(
    (state) => state.providersCategories.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/providers-categories"+props.location.search);
   
   
  };




let isCheckedStatus  = isNew?false: providersCategoriesEntity.status;
const handleChangeStatus=(e)=> {
  isCheckedStatus = e.target.checked;
  
}
let isCheckedHolding  = isNew?false: providersCategoriesEntity.itWillHaveHoldingCompaniesb;
const handleChangeHolding=(e)=> {
  isCheckedHolding = e.target.checked;

}

//file handler 

const[animation,setAnimation] = useState(false)
const[nameFile,setNameFile] = useState("")
const[statusFile,setStatusFile] = useState(false)
const [selectedFile, setSelectedFile] = useState();
const [isFilePicked, setIsFilePicked] = useState(false);

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




  useEffect(() => {
    if (isNew) {
      dispatch(reset());
      isCheckedStatus = false
      isCheckedHolding=false

    } else {
     // dispatch(reset());
      dispatch(getEntity(props.match.params.id));
   

    }
  }, [isCheckedStatus,isCheckedHolding]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);


  const saveEntity = (values) => {
  
   values.status = isCheckedStatus;
    values.creationDate = new Date();
    values.addedBy = account.login;
    values.itWillHaveHoldingCompaniesb = isCheckedHolding;
    values.providersCategorieIconUrl=isNew?"https://file.engineeric.qa/engineeric/fileSystem/Image/png/"+nameFile:nameFile===""?providersCategoriesEntity.providersCategorieIconUrl:"https://file.engineeric.qa/engineeric/fileSystem/Image/png/"+nameFile;





    const entity = {
      ...providersCategoriesEntity,
      ...values,
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
        ...providersCategoriesEntity,

      };

  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container  mb-10 " style={{ width: "70%", marginLeft: "6%" }}>

      <div className="bg-white shadow-md px-9 py-9 sm:rounded-lg sm:p-6 p-7">


        <div className="mb-7 mt-7">

          <h3 className="text-lg  leading-6 text-[#909090] text-right flex justify-end   font-bold">


            إضافة / تعديل التفاصيل
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="ml-3">
              <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090" />
            </svg>

          </h3>
        </div>
        <div   >
          {loading && providersCategoriesEntity ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm className="grid grid-cols-6 gap-6"
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >

              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={" اسم الفئة بالانجليزي "}


                id="providers-categories-providersCategorieNameInEnglish"
                name="providersCategorieNameInEnglish"
                data-cy="providersCategorieNameInEnglish"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />


              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"  اسم الفئة بالعربي  "}

                id="providers-categories-providersCategorieNameInArabic"
                name="providersCategorieNameInArabic"
                data-cy="providersCategorieNameInArabic"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
      

              <div className="col-span-6 sm:col-span-6 lg:col-span-6" dir="rtl">
      
                <fieldset className="space-y-5 -ml-16 mt-5 mb-10">

                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                       id="providers-categories-status"
                        aria-describedby="providers-categories-status"
                        name="providers-categories-status"
                        type="checkbox"
                        defaultChecked={isCheckedStatus}
                        data-cy="providers-categories-status"
                        onChange={e => handleChangeStatus(e)}

                        className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                      />





                    </div>
                    <div className="-ml-16 text-sm">
                      <label htmlFor="providers-categories-status" className="font-medium text-gray-700">
                        الحالة
                      </label>
                      <p id="providers-categories-status" className="text-gray-500">

                        عند تفعيل الفئة سوف يتم اظهاره في البرنامج
                      </p>

                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="providers-categories-itWillHaveHoldingCompaniesb"
                        aria-describedby="providers-categories-itWillHaveHoldingCompaniesb"
                        name="providers-categories-itWillHaveHoldingCompaniesb"
                        data-cy="providers-categories-itWillHaveHoldingCompaniesb"
                       
                        type="checkbox"
                        defaultChecked={isCheckedHolding}
                        onChange={e => handleChangeHolding(e)}
                       // defaultChecked={providersCategoriesEntity.itWillHaveHoldingCompaniesb}

                       // onChange={() => setItWillHaveHoldingCompaniesb(!itWillHaveHoldingCompaniesb)}


                        className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                      />
                    </div>
                    <div className="-ml-16 text-sm">
                      <label htmlFor="providers-categories-itWillHaveHoldingCompaniesb" className="font-medium text-gray-700">
                        الفئة هل سيكون لديها شركات قابضة
                      </label>
                      <p id="providers-categories-itWillHaveHoldingCompaniesb" className="text-gray-500">

                        عند الفئة   سوف يتم اظهاره في البرنامج
                      </p>
                    </div>
                  </div>




                </fieldset>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-6">

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5  mt-8 " dir="rtl">
                  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    ارفاق أيقونة الفئة
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
                            className="relative cursor-pointer  bg-white rounded-sm font-medium text-[#827349] hover:text-[#827349] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#505050]"
                          >
                            <span>رفع الصوره</span>
                            <input id="file-upload"  onChange={changeHandler} name="file-upload" type="file" accept="image/png" className="sr-only" />
                          </label>
              
                        </div>
                        <p className="text-xs text-gray-500">PNG to 2MB</p>

                        <div className="flex justify-center items-center text-sm ">
				<button   className="relative cursor-pointer  bg-white rounded-sm font-sm text-[#827349] hover:text-[#827349] " onClick={handleSubmission}>
          
        {animation&&<div className="flex items-center justify-center space-x-2 animate-bounce">
    <div className="w-3 h-3 bg-[#827349]  rounded-full"></div>
    <div className="w-3 h-3 bg-[#827349] hite rounded-full"></div>
    <div className="w-3 h-3 bg-[#827349] rounded-full"></div>

</div>}
    
          
          رفع إلى الخادم
          
          
          
          </button>
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
                حفظ
              </Button>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/providers-categories"
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
  );
};

export default ProvidersCategoriesUpdate;
