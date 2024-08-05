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

import { IProviders } from "app/shared/model/providers.model";
import { getEntities as getProviders } from "app/entities/providers/providers.reducer";
import { IContract } from "app/shared/model/contract.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./contract.reducer";
import dayjs from "dayjs";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export const ContractUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const providers = useAppSelector((state) => state.providers.entities);
  const contractEntity = useAppSelector((state) => state.contract.entity);
  const loading = useAppSelector((state) => state.contract.loading);
  const updating = useAppSelector((state) => state.contract.updating);
  const updateSuccess = useAppSelector((state) => state.contract.updateSuccess);
  const [enabled, setEnabled] = useState(false)
  const [startContractDate, setStartContractDate] = useState(null);
  const [endContractDate, setEndContractDate] = useState(null);
  const handleClose = () => {
    props.history.push("/contract");
  };







  const isCheckedStatus = isNew ? false : contractEntity && contractEntity.status;
  const StartDate = isNew ? dayjs(new Date()).format('YYYY-MM-DD').toString() : contractEntity && dayjs(contractEntity.contractStartDate).format('YYYY-MM-DD').toString()
  const EndDate = isNew ? dayjs(new Date()).format('YYYY-MM-DD').toString() : contractEntity && dayjs(contractEntity.contractEndDate).format('YYYY-MM-DD').toString();
  const [animation, setAnimation] = useState(false)
  const [nameFile, setNameFile] = useState("")
  const [statusFile, setStatusFile] = useState(false)
  //const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setNameFile(event.target.files[0].name);
    setIsFilePicked(true);
  };



  const [selectedFile, setSelectedFile] = useState(null);

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
        .post(`${SERVER_API_URL_File}/api/AwqafFiles`, formData)
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
    formData.append('FileName', selectedFile);

    fetch(
      'https://awqaf.engineeric.qa/api/AwqafFiles',
      {
        method: 'POST',
        body: formData,
        redirect: 'follow',

      }
    )
      .then((response) => response.text())
      .then((result) => {
        setStatusFile(true)
        setAnimation(false)
      })
      .catch((error) => {

      });
  };






  useEffect(() => {

    if (isNew) {
      dispatch(reset());


    } else {
      setStatusFile(true);

      dispatch(getEntity(props.match.params.id));

    }

    dispatch(getProviders({}));
    setEnabled(isCheckedStatus)
    setStartContractDate(StartDate)
    setEndContractDate(EndDate)
  }, [StartDate, EndDate, isCheckedStatus]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {


    values.contractStartDate = startContractDate;
    values.contractEndDate = endContractDate;
    values.creationDate = new Date();
    values.contarctFileUrl = isNew ? `${SERVER_API_URL_File}/api/AwqafFiles/get/fileData?FileName=` + nameFile : nameFile === "" ? contractEntity.contarctFileUrl : `${SERVER_API_URL_File}/api/AwqafFiles/get/fileData?FileName=` + nameFile;





    values.status = enabled
    const entity = {
      ...contractEntity,
      ...values,
      providers: providers.find(
        (it) => it.id.toString() === values.providers.toString()
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
        ...contractEntity,
        providers: contractEntity?.providers?.id,
      };



  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container  mb-10 " style={{ width: "70%", marginLeft: "6%" }}>

      <div className="bg-white shadow-md px-9 py-9 sm:rounded-lg sm:p-6 p-7">
        {/* <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload</button>
        </div> */}

        <div className="mb-7 mt-7">

          <h3 className="text-lg  leading-6 text-[#909090] text-right flex justify-end   font-bold">


            إضافة / تعديل التفاصيل {statusFile}
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="ml-3">
              <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090" />
            </svg>

          </h3>
        </div>
        <div   >
          {loading && contractEntity ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm className="grid grid-cols-6 gap-6"
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {!isNew ? (<div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
                </label>


              </div>) : <div className="col-span-6 sm:col-span-6 lg:col-span-2"></div>}
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="contract-end-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
                  تاريخ انتهاء العقد
                </label>
                <input

                  defaultValue={endContractDate}
                  onChange={(e) => { setEndContractDate(e.target.value) }}
                  id="contract-end-Date"
                  name="contract-end-Date"
                  type="date"
                  min={startContractDate}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="contract-Start-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3">
                  تاريخ بدء العقد
                </label>
                <input
                  defaultValue={startContractDate}
                  id="contract-start-Date"
                  name="contract-start-Date"
                  type="date"
                  min={today}
                  required
                  onChange={(e) => { setStartContractDate(e.target.value) }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#827349] focus:border-[#827349] sm:text-sm"
                />
              </div>




              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={" رقم الاتصال"}
                id="contract-contactNumber"
                name="contactNumber"
                data-cy="contactNumber"
                type="text"
              />
              <ValidatedField className="col-span-6 sm:col-span-3 lg:col-span-3 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={" البريد الإلكتروني"}
                id="contract-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <div className="col-span-6 sm:col-span-6 lg:col-span-6 mt-5 mb-10" dir="rtl">
                {/* <label htmlFor="contract-Start-Date" className="block text-sm font-medium text-gray-700 text-right mr-3 mb-3  ">
          الحالة العقد  
          </label> */}

                {/* <Switch.Group as="div" className="flex items-center justify-between">
     <span className="flex-grow flex flex-col">
        <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
        
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
         
        </Switch.Description>
      </span>

   
      <Switch

        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-[#827349]' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      
    </Switch.Group> */}


                <div className="relative flex items-start w-full -ml-16" >
                  <div className="flex items-center h-5">
                    <input
                      id="active"
                      aria-describedby="active"
                      name="active"
                      type="checkbox"
                      defaultChecked={enabled}
                      onChange={() => setEnabled(!enabled)}



                      className="focus:ring-[#827349] h-4 w-4 text-[#827349] border-gray-300 rounded mt-5"
                    />
                  </div>
                  <div className="-ml-20 text-sm">
                    <label htmlFor="active" className="font-medium text-gray-700">
                      الحالة العقد
                    </label>
                    {/* <p id="active" className="text-gray-500">

                          عند تفعيل مقدم الخدمه سوف يتم اظهاره في البرنامج
                        </p> */}

                  </div>
                </div>

              </div>



              <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                id="contract-providers"
                name="providers"
                data-cy="providers"
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
              <ValidatedField className="col-span-6 sm:col-span-6 lg:col-span-6 text-sm font-medium text-gray-700 text-right mt-5 mb-10  space-y-3"
                label={"وصف العقد "}
                id="contract-contractDescription"
                name="contractDescription"
                data-cy="contractDescription"
                rows={3}
                type="textarea"
              />

              <div className="col-span-6 sm:col-span-6 lg:col-span-6">

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5  mt-8 " dir="rtl">

                  <button className="relative cursor-pointer  bg-white rounded-sm font-sm text-[#827349] hover:text-[#827349] " onClick={handleFileUpload}>




                    رفع إلى الخادم



                  </button>
                  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    ارفاق ملف العقد
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
                            <input type="file" accept="application/pdf" onChange={handleFileChange} />
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
            



              <div>



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


                  {animation ? "رفع.." : "حفظ"}
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  data-cy="entityCreateCancelButton"
                  to="/contract"
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

export default ContractUpdate;
