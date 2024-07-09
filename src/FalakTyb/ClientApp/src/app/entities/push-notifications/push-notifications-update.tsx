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

import { IPushNotifications } from "app/shared/model/push-notifications.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./push-notifications.reducer";

export const PushNotificationsUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const pushNotificationsEntity = useAppSelector(
    (state) => state.pushNotifications.entity
  );
  const loading = useAppSelector((state) => state.pushNotifications.loading);
  const updating = useAppSelector((state) => state.pushNotifications.updating);
  const account = useAppSelector((state) => state.authentication.account);

const [header,setHeader]=useState("")
const [details,setdetails]=useState("")

  const updateSuccess = useAppSelector(
    (state) => state.pushNotifications.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/push-notifications");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );

      Array.from(document.querySelectorAll("textarea")).forEach(
        textarea => (textarea.value = "")
      );
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
values.header=header
values.details=details
values.sentDate= new Date();
values.sentBy=account.login

    const entity = {
      ...pushNotificationsEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );

      Array.from(document.querySelectorAll("textarea")).forEach(
        textarea => (textarea.value = "")
      );
    } else {
      dispatch(updateEntity(entity));
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );

      Array.from(document.querySelectorAll("textarea")).forEach(
        textarea => (textarea.value = "")
      );
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pushNotificationsEntity,
        };

  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container  mb-10 " style={{ width: "70%" ,marginLeft:"6%"}}>

    <div className="bg-white shadow-md px-4 py-5 sm:rounded-lg sm:p-6" >
    {loading ? (
            <p>Loading...</p>
          ) : (
           !loading&&<ValidatedForm
          
             onSubmit={saveEntity}
            >
    <div className="p-5">
      
      <div className="mb-7">
        
        <h3 className="text-lg  leading-6 text-[#909090] text-right flex justify-end   font-bold">
    ارسال تنبيه للموظفين

              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="ml-3">
  <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090"/>
</svg>
          
          </h3>
      </div>
  
         
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="grid grid-cols-6 gap-6 ">
        
      
          
          {!isNew ? (<div className="col-span-6 sm:col-span-6 lg:col-span-6">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
            رقم السؤال
            </label>
      
        
          </div>) : <div className="col-span-6 sm:col-span-6 lg:col-span-6"></div>}

     

          <div className="col-span-6 sm:col-span-3 lg:col-span-6">
          <label htmlFor="contract-end-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
          عنوان التنبيه                  
             </label>
             <input
      
                    defaultValue={header}
                    onChange={(e) => {setHeader(e.target.value)}}
                    id="header"
                    name="header"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
                  />
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-5 ">
          <label htmlFor="contract-Start-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
            نص التنبيه
           </label>
            <div className="mt-1">
                <textarea dir="rtl"
                  defaultValue={details}
                  id="details"
                  onChange={(e) => {setdetails(e.target.value)}}

                  name="details"
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
              
                />
              </div>
              <p className="mt-2   text-xs text-gray-600 text-right">  </p>





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
                    ارسال
                  </Button>
                  <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/push-notifications"
                replace
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[#909090] shadow-sm px-8 py-2 bg-[#909090] text-base font-medium text-[#ffffff] hover:bg-[#909090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#909090] sm:mt-0 sm:w-auto sm:text-sm"
              >
              رجوع
              </Button>
                </div>
                </ValidatedForm>)}
  </div>

</div>
  );
};

export default PushNotificationsUpdate;
