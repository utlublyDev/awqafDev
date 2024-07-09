import React, { useState, useEffect } from "react";
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
} from "react-jhipster";
import { Row, Col, Button } from "reactstrap";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getSession } from "app/shared/reducers/authentication";
import PasswordStrengthBar from "app/shared/layout/password/password-strength-bar";
import { savePassword, reset } from "./password.reducer";

export const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const account = useAppSelector((state) => state.authentication.account);
  const successMessage = useAppSelector(
    (state) => state.password.successMessage
  );
  const errorMessage = useAppSelector((state) => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    } else if (errorMessage) {
      toast.error(translate(errorMessage));
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 container ml-20  mb-10 " style={{ width: "75%" }}>   
    <Row className="justify-content-center">
      <Col className="mt-5 md:mt-0 md:col-span-2">
      <div className="md:col-span-1">
      <h3 className="text-lg font-medium leading-6 text-gray-900 text-right">{account.login}  تغيير كلمة المرور الخاصة بك </h3>
      <p className="mt-1 text-sm text-gray-500 text-right">يمكنك تغيير كلمة المرور الخاصة بك من الحقول التالية</p>
    </div>
      <div className="">


   
      <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>

             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
             كلمة المرور الحالية           
                </label>
              <ValidatedField
              name="currentPassword"
              label={" "}
              placeholder={"كلمة المرور الحالية "}
              type="password"
              validate={{
                required: {
                  value: true,
                  message: translate(
                    "global.messages.validate.newpassword.required"
                  ),
                },
              }}
              data-cy="currentPassword"
            />
             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
             كلمة السر الجديدة          
                 </label>
              <ValidatedField
              name="newPassword"
              label={" "}
              placeholder={"كلمة السر الجديدة "}
              type="password"
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
              onChange={updatePassword}
              data-cy="newPassword"
            />
             <div dir="rtl" className="mt-5 mb-3 mr-3">
              <PasswordStrengthBar  password={password} />
              </div>
           <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mt-5 mb-3 mr-3">
           تأكيد كلمة السر الجديدة            
             </label>
            
            <ValidatedField
              name="confirmPassword"
              label={" "}
              placeholder={" تأكيد كلمة السر الجديدة "}
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
              data-cy="confirmPassword"
            />
 
     


 <a  href="/account/settings"       style={{ backgroundColor: '#F2F0F0',marginRight: 10 }}
               
               className="group relative   py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 "
             >
               <span className="absolute left-0 inset-y-0 flex items-center pl-3">

               </span>
               الرجوع              
                 </a>

          <button style={{ backgroundColor: '#827349', }}
                type="submit"
                className="group relative   py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                </span>
                حفظ              
                  </button>


              
        </ValidatedForm>
        </div>
   

  
      </Col>
    </Row>
  </div>
  );
};

export default PasswordPage;
