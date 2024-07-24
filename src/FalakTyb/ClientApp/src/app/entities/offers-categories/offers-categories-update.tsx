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

import { IOffersCategories } from "app/shared/model/offers-categories.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./offers-categories.reducer";

export const OffersCategoriesUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);
  const account = useAppSelector((state) => state.authentication.account);

  const offersCategoriesEntity = useAppSelector(
    (state) => state.offersCategories.entity
  );
  const loading = useAppSelector((state) => state.offersCategories.loading);
  const updating = useAppSelector((state) => state.offersCategories.updating);  
  const providers = useAppSelector((state) => state.providers.entities);

  const updateSuccess = useAppSelector(
    (state) => state.offersCategories.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/offers-categories");
  };
  let isCheckedStatus  = isNew?false: offersCategoriesEntity.status;
  const handleChangeStatus=(e)=> {
    isCheckedStatus = e.target.checked;
  
  }
  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, [isCheckedStatus]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {

    values.addedBy = account.login;
    values.status=isCheckedStatus
    values.creationDate =isNew?new Date():offersCategoriesEntity.creationDate;
    values.offerCategorieIconUrl= "https://i.ibb.co/Bc0F9z6/no-photo-available.png"
    const entity = {
      ...offersCategoriesEntity,
      ...values,
      providers: providers.find(
        (it) => it.id.toString() === values.offerProviderId.toString()
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
          ...offersCategoriesEntity,
          providers: offersCategoriesEntity?.offerProviderId,
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
          {loading && offersCategoriesEntity ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm className="grid grid-cols-6 gap-6"
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >

              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={" اسم الفئة بالانجليزي "}


                id="offers-categories-offerCategorieNameInEnglish"
                name="offerCategorieNameInEnglish"
                data-cy="offerCategorieNameInEnglish"
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

                id="offers-categories-offerCategorieNameInArabic"
                name="offerCategorieNameInArabic"
                data-cy="offerCategorieNameInArabic"
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

               




                </fieldset>
              </div>


              <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                 id="offers-categories-offerProviderId"
                 name="offerProviderId"
                 data-cy="offerProviderId"
                label={"مقدم الخدمة"}
                type="select"
              >
                    <option value={null}>اختر مقدم الخدمة</option>
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
                            <input id="file-upload" name="file-upload" type="file" accept="image/png" className="sr-only" />
                          </label>
                          <p className="pl-1">أو اسحب الصوره</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG,  to 10MB</p>
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
                disabled={updating}

                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
              // onClick={confirmDelete}
              >
                حفظ
              </Button>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/offers-categories"
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

export default OffersCategoriesUpdate;
