import React, { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  isEmail,
} from "react-jhipster";
import { toast } from "react-toastify";

import { locales, languages } from "app/config/translation";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { getSession } from "app/shared/reducers/authentication";
import { saveAccountSettings, reset } from "./settings.reducer";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const successMessage = useAppSelector(
    (state) => state.settings.successMessage
  );

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  const handleValidSubmit = (values) => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-20  mb-10 " style={{ width: "75%" }}>   
      <Row className="justify-content-center">
        <Col className="mt-5 md:mt-0 md:col-span-2">
        <div className="md:col-span-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-right">{account.login} معلومات الشخصية </h3>
        <p className="mt-1 text-sm text-gray-500 text-right">يمكنك تعديل معلوماتك الشخصية من الحقول التالية</p>
      </div>
        <div className="">


     
          <ValidatedForm
            id="settings-form"
            onSubmit={handleValidSubmit}
            defaultValues={account}
          >
               <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">

                اسم بالانجليزي           
                </label>
            <ValidatedField
              name="firstName"
              label={""}
              id="firstName"
              placeholder={translate("settings.form.firstname.placeholder")}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    "settings.messages.validate.firstname.required"
                  ),
                },
                minLength: {
                  value: 1,
                  message: translate(
                    "settings.messages.validate.firstname.minlength"
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    "settings.messages.validate.firstname.maxlength"
                  ),
                },
              }}
              data-cy="firstname"
            />
               <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">

               اسم بالعربي    
                           </label>
            <ValidatedField
              name="lastName"
              label={""}
              id="lastName"
              placeholder={""}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    "settings.messages.validate.lastname.required"
                  ),
                },
                minLength: {
                  value: 1,
                  message: translate(
                    "settings.messages.validate.lastname.minlength"
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    "settings.messages.validate.lastname.maxlength"
                  ),
                },
              }}
              data-cy="lastname"
            />
             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
                البريد الالكتروني
                </label>
            <ValidatedField
              name="email"
              label={""}
              placeholder={""}
              type="email"
              validate={{
                required: {
                  value: true,
                  message: translate("global.messages.validate.email.required"),
                },
                minLength: {
                  value: 5,
                  message: translate(
                    "global.messages.validate.email.minlength"
                  ),
                },
                maxLength: {
                  value: 254,
                  message: translate(
                    "global.messages.validate.email.maxlength"
                  ),
                },
                validate: (v) =>
                  isEmail(v) ||
                  translate("global.messages.validate.email.invalid"),
              }}
              data-cy="email"
            />
   
       




            <button style={{ backgroundColor: '#827349', }}
                  type="submit"
                  className="group relative   py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  </span>
                  حفظ              
                    </button>


                    <a  href="/account/password"       style={{ backgroundColor: '#F2F0F0',marginLeft: 10 }}
               
                  className="group relative   py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  </span>
                  تغيير كلمة المرور              
                    </a>
          </ValidatedForm>
          </div>
     

    
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
