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

import { INewCompany } from "app/shared/model/new-company.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./new-company.reducer";

export const NewCompanyUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const newCompanyEntity = useAppSelector((state) => state.newCompany.entity);
  const loading = useAppSelector((state) => state.newCompany.loading);
  const updating = useAppSelector((state) => state.newCompany.updating);
  const updateSuccess = useAppSelector(
    (state) => state.newCompany.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/new-company");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    values.creationDate = new Date();
    const entity = {
      ...newCompanyEntity,
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
        ...newCompanyEntity,
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
          {loading && newCompanyEntity ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm className="grid grid-cols-6 gap-6"
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >

              <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"اسم مقدم الطلب  "}


                id="new-company-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />


              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"اسم الشركة"}
                id="new-company-companyName"
                name="companyName"
                data-cy="companyName"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"العنوان "}
                id="new-company-address"
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
                label={" رقم الهاتف"}
                id="new-company-phoneNumber"
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
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={" البريد الإلكتروني"}
                id="new-company-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"نوع الشركة"}
                id="new-company-companyType"
                name="companyType"
                data-cy="companyType"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"رقم الرخصة التجارية"}
                id="new-company-commercialRegistrationNo"
                name="commercialRegistrationNo"
                data-cy="commercialRegistrationNo"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"رقم السجل التجارية"}
                id="new-company-tradeLicenseNumber"
                name="tradeLicenseNumber"
                data-cy="tradeLicenseNumber"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"نوع الخدمة"}
                id="new-company-serviceType"
                name="serviceType"
                data-cy="serviceType"
                type="text"
              />











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
                  to="/new-company"
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

export default NewCompanyUpdate;
