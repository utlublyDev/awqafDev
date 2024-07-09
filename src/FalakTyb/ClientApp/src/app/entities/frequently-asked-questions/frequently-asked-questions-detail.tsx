import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./frequently-asked-questions.reducer";

export const FrequentlyAskedQuestionsDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const frequentlyAskedQuestionsEntity = useAppSelector(
    (state) => state.frequentlyAskedQuestions.entity
  );
  const creationDate = new Date(frequentlyAskedQuestionsEntity.creationDate);

  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
  const creationDateString = days[creationDate.getDay()] + ', ' + creationDate.getDate() + ' ' + months[creationDate.getMonth()] + ', ' + creationDate.getFullYear();
  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-12  mb-10 " style={{ width: "80%" }}>
    <div className="bg-white  rounded-lg shadow-md overflow-hidden sm:rounded-lg"dir="rtl">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900"> تفاصيل السؤال #   {frequentlyAskedQuestionsEntity.id} </h3>
       
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">السؤال بالعربي</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {frequentlyAskedQuestionsEntity.questionInArabic}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> السؤال بالانجليزي</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {frequentlyAskedQuestionsEntity.questionInEnglish}
              </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">  الاجابة بالعربي</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{frequentlyAskedQuestionsEntity.answerInArabic}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> الاجابة بالانجليزي</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{frequentlyAskedQuestionsEntity.answerInEnglish}</dd>
          </div>
    
     
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">أضيف بواسطة</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{frequentlyAskedQuestionsEntity.addedBy}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500"> تاريخ الإنشاء</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{creationDateString}</dd>
          </div>

       
        
        </dl>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse mb-8 py-4 ml-4">
        <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/frequently-asked-questions"
                replace
                className="mt-3 w-full inline-flex justify-center rounded-md border border-[#909090] shadow-sm px-8 py-2 bg-[#909090] text-base font-medium text-[#ffffff] hover:bg-[#909090] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#909090] sm:mt-0 sm:w-auto sm:text-sm"
              >
              رجوع
              </Button>

                  <Button
                     tag={Link}
                     to={`/frequently-asked-questions/${frequentlyAskedQuestionsEntity.id}/edit`}
                     replace
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-[#827349] text-base font-medium text-white hover:bg-[#827349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#827349] sm:ml-3 sm:w-auto sm:text-sm"
                 
                  >
                    تعديل
                  </Button>
                </div>
      </div>
    </div>
    </div>
  );
};

export default FrequentlyAskedQuestionsDetail;
