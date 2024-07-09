import React, { Fragment, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./offers.reducer";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/solid";

export const OffersDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const offersEntity = useAppSelector((state) => state.offers.entity);
  const updateSuccess = useAppSelector((state) => state.offers.updateSuccess);

  const handleClose = () => {
    props.history.push("/offers");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(offersEntity.id));
  };
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  if(open){
    return (
    <>
   
      <div className="absolute  w-full h-full top-0  flex  items-center justify-center z-50   inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0">
  
    
      <div className="bg-white shadow sm:rounded-lg  ">
      <div className="px-4 py-5 sm:p-6">
        <div className="">
          <div>
            <h3 className="text-base    text-right font-semibold leading-6 text-gray-900">تحذير حذف </h3>
            <div className="mt-2 max-w-xl  text-right text-sm text-gray-500">
              <p>
              هل أنت متأكد أنك تريد حذف   البينات ؟ ستتم إزالة  البينات نهائيًا من الخادم إلى الأبدء.
  
              </p>
            </div>
          </div>
          <div className="   flex flex-row   sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
          <button 
            onClick={()=>{
              setOpen(false)
              handleClose()
            }}
              type="button"
              className=" mt-5 ml-2 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              إلغاء
            </button>
            <button
              onClick={()=>{
                setOpen(false)
                confirmDelete()
                handleClose()
              }}
              type="button"
              className=" mt-5  ml-2 inline-flex items-center rounded-md bg-[#827349] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#827349] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#827349]"
            >
              نعم
            </button>
           
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
    )}
    else{
      return null 
    }
  };
export default OffersDeleteDialog;
