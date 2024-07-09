import React, { useState, useEffect } from "react";
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  isEmail,
} from "react-jhipster";
import { Row, Col, Alert, Button } from "reactstrap";
import { toast } from "react-toastify";

import PasswordStrengthBar from "app/shared/layout/password/password-strength-bar";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { handleRegister, reset } from "./register.reducer";
import { useHistory } from "react-router-dom";

export const RegisterPage = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);

  const handleValidSubmit = ({ username, email, firstPassword ,firstName,lastName,emplyeeCard}) => {
    dispatch(
      handleRegister({
        login: username,
        email,
        password: "1234",
        langKey: currentLocale,
        firstName,
        lastName,
        emplyeeCard,
        authorities:["role_user"]
      })
    );
    
  };


  const successMessage = useAppSelector(
    (state) => state.register.successMessage
  );

  useEffect(() => {
    if (successMessage) {
      history.push("/admin/user-management")
    }
  }, [successMessage]);

  return (
  


<div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-20  mb-10 " style={{ width: "75%" }}>   
<Row className="justify-content-center">
  <Col className="mt-5 md:mt-0 md:col-span-2">
  <div className="md:col-span-1">
  <h3 className="text-lg font-medium leading-6 text-gray-900 text-right"> انشاء حساب جديد </h3>
  <p className="mt-1 text-sm text-gray-500 text-right">يمكنك   انشاء حساب جديد من الحقول التالية</p>
</div>
  <div className="">



    <ValidatedForm
     id="register-form" onSubmit={handleValidSubmit}
    >
         <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
       اسم االمستخدم      
             </label>
      <ValidatedField
        name="username"
        label={""}
        id="username"
       // placeholder={}
      
      />
         <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
         اسم بالانجليزي        
         
           </label>
      <ValidatedField
        name="firstName"
        label={""}
        id="lastName"
        placeholder={""}
      
      />

<label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
اسم بالعربي         
           </label>
      <ValidatedField
        name="lastName"
        label={""}
        id="lastName"
        placeholder={""}
      
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

 


<label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
رقم الوظيفي
          </label>

<ValidatedField
              name="emplyeeCard"
              label={""}
              placeholder={""}
           
            />
{/* 

<ValidatedField
              name="firstPassword"
              label={translate("global.form.newpassword.label")}
              placeholder={translate("global.form.newpassword.placeholder")}
              type="password"
              onChange={updatePassword}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    "global.messages.validate.newpassword.required"
                  ),
                },
                minLength: {
                  value: 4,
                  message: translate(
                    "global.messages.validate.newpassword.minlength"
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    "global.messages.validate.newpassword.maxlength"
                  ),
                },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label={translate("global.form.confirmpassword.label")}
              placeholder={translate("global.form.confirmpassword.placeholder")}
              type="password"
              validate={{
                required: {
                  value: true,
                  message: translate(
                    "global.messages.validate.confirmpassword.required"
                  ),
                },
                minLength: {
                  value: 4,
                  message: translate(
                    "global.messages.validate.confirmpassword.minlength"
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    "global.messages.validate.confirmpassword.maxlength"
                  ),
                },
                validate: (v) =>
                  v === password ||
                  translate("global.messages.error.dontmatch"),
              }}
              data-cy="secondPassword"
            /> */}
















      <button style={{ backgroundColor: '#827349', }}
                     type="submit"
            className="group relative   py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

            </span>
            تسجيل حساب جديد              
              </button>


    </ValidatedForm>
    </div>



  </Col>
</Row>
</div>











  );
};

export default RegisterPage;
