import "./header.scss";

import React, { useState, useEffect } from "react";
import { Translate, Storage } from "react-jhipster";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import LoadingBar from "react-redux-loading-bar";

import { isRTL } from "app/config/translation";
import { Home, Brand } from "./header-components";
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from "../menus";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { setLocale } from "app/shared/reducers/locale";
import { getEntitiesproviders } from "app/entities/providers/providers.reducer";
import { getEntitiesReviewsAndRating } from "app/entities/reviews-and-rating/reviews-and-rating.reducer";
import { getEntitiesfrequentlyaskedquestions } from "app/entities/frequently-asked-questions/frequently-asked-questions.reducer";
import { getEntitiescontracts } from "app/entities/contract/contract.reducer";
import { getEntitiesOffers } from "app/entities/offers/offers.reducer";
import { getEntitiesNewCompanies } from "app/entities/new-company/new-company.reducer";
import {ExportCSVAll} from "../../exportCVS/ExportCSVAll"
import { Link } from "react-router-dom";
export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() =>
    document
      .querySelector("html")
      .setAttribute("dir", isRTL(Storage.session.get("locale")) ? "rtl" : "ltr")
  );

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const handleLocaleChange = (event) => {
    const langKey = event.target.value;
    Storage.session.set("locale", langKey);
    dispatch(setLocale(langKey));
    document
      .querySelector("html")
      .setAttribute("dir", isRTL(langKey) ? "rtl" : "ltr");
  };

  




  const providersList = useAppSelector((state) => state.providers.entities);
  const loading = useAppSelector((state) => state.providers.loading);

  useEffect(() => {
    dispatch(getEntitiesproviders({}));
  }, []);






  const reviewsAndRatingList = useAppSelector(
    (state) => state.reviewsAndRating.entities
  );

  useEffect(() => {
    dispatch(getEntitiesfrequentlyaskedquestions({}));
  }, []);
  useEffect(() => {
    dispatch(getEntitiesReviewsAndRating({}));
  }, []);

  useEffect(() => {
    dispatch(getEntitiesOffers({}));
  }, []);

  const contractList = useAppSelector((state) => state.contract.entities);
  const offersList = useAppSelector((state) => state.offers.entities);

  useEffect(() => {
    dispatch(getEntitiescontracts({}));
  }, []);

  useEffect(() => {
    dispatch(getEntitiesNewCompanies({}));
  }, []);

  const newCompanyList = useAppSelector((state) => state.newCompany.entities);



  const frequentlyAskedQuestionsList = useAppSelector(
    (state) => state.frequentlyAskedQuestions.entities
  );



  const currentDate = new Date();
  const currentDateTime = currentDate.getTime();
  const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
  const last30DaysDateTime = last30DaysDate.getTime();







  const today = new Date();
  const contractsEndDate = contractList?.filter((contract) => {
    const contractEndDates = new Date(contract?.contractEndDate);
    return today > contractEndDates
  });






  const last30DaysListFrequentlyAskedQuestions = frequentlyAskedQuestionsList.filter(x => {
    const elementDateTime = new Date(x.creationDate).getTime();
    if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
      return true;
    }
    return false

  });


  const last30DaysListOfferss = offersList.filter(x => {
    const elementDateTime = new Date(x.creationDate).getTime();
    if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
      return true;
    }
    return false

  });


  const last30DaysListNewCompany = newCompanyList.filter(x => {
    const elementDateTime = new Date(x.creationDate).getTime();
    if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
      return true;
    }
    return false

  });




  const totalItems = useAppSelector((state) => state.contract.totalItems);
  const totalItemsOffer = useAppSelector((state) => state.offers.totalItems);
  const totalItemsNewCompany = useAppSelector((state) => state.newCompany.totalItems);

 






  const totalItemfrequentlyAskedQuestionss = useAppSelector((state) => state.frequentlyAskedQuestions.totalItems);



  return (
    <>

      <div className="">

        <main className="h-1/2 overflow-y-auto">

          <div className="container  mx-auto grid ">
            <div className="p-7  justify-end py-8 container  mx-auto grid" style={{ width: "55%" }}>
              <span className="  text-right   text-xl font-extrabold  text-[#1A1A1A] ">{account.login} السلام عليكم </span>
              <ExportCSVAll csvData={{}} fileName={'تقرير'} />
              <Link to={"/admin/user-management"}  className="whitespace-nowrap px-3  text-sm text-[#827349] underline text-right">الحسابات</Link>
            </div>
            {/* Cards */}
            <div className="grid mb-10  md:grid-cols-2 xl:grid-cols-5 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:justify-items-center">
              {/* Card */}
              <div className=" items-center block   p-4 bg-white rounded-lg shadow-md  lg:w-52 md:w-52	 mb-6">

                <div>
                  <div className="p-3 mr-0  flex  justify-end ">
                    <p className="mb-2 text-sm font-medium  text-right mr-3 text-[#827349]  ">
                      العقود
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20">
                      <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#827349" />
                    </svg>

                  </div>
                  <div className="flex  justify-center">
                    <div className="mr-5">
                      <p className="text-xs  text-[#909090]  w-full ">
                        العقود المنتهية
                      </p>
                      <p className="text-lg  text-gray-700  mt-3 text-center font-extrabold">
                        {contractsEndDate.length}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs  text-[#909090]  w-full ">
                        مجموع  للعقود
                      </p>
                      <p className="text-lg  text-black-700  mt-3 text-center font-extrabold">

                        {totalItems}
                      </p>
                    </div>
                  </div>
                </div>
              </div>





              <div className=" items-center block   p-4 bg-white rounded-lg shadow-md lg:w-52 md:w-52	 mb-6">

                <div>
                  <div className="p-3 mr-0  flex  justify-end ">
                    <p className="mb-2 text-sm font-medium  text-right mr-3 text-[#827349]  ">
                      الاسئلة الشائعة
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.98" height="20" viewBox="0 0 19.98 20">
                      <g id="_01_align_center" data-name="01 align center" transform="translate(-0.024 0)">
                        <path id="Path_9" data-name="Path 9" d="M20,20H10.019A10,10,0,1,1,20,9.372V20ZM10.019,1.667a8.333,8.333,0,0,0,0,16.667h8.318V9.451A8.348,8.348,0,0,0,10.019,1.667Z" transform="translate(0 0)" fill="#827349" />
                        <rect id="Rectangle_110" data-name="Rectangle 110" width="5" height="1.667" transform="translate(5.837 5.833)" fill="#827349" />
                        <rect id="Rectangle_111" data-name="Rectangle 111" width="8.333" height="1.667" transform="translate(5.837 9.167)" fill="#827349" />
                        <rect id="Rectangle_112" data-name="Rectangle 112" width="8.333" height="1.667" transform="translate(5.837 12.5)" fill="#827349" />
                      </g>
                    </svg>


                  </div>
                  <div className="flex  justify-center">
                    <div className="mr-5">
                      <p className="text-xs  text-[#909090]  w-full ">
                        الاسئلة الجديدة           </p>
                      <p className="text-lg  text-gray-700  mt-3 text-center font-extrabold">
                        {frequentlyAskedQuestionsList && last30DaysListFrequentlyAskedQuestions.length}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs  text-[#909090]  w-full ">
                        مجموع الاسئلة
                      </p>
                      <p className="text-lg  text-black-700  mt-3 text-center font-extrabold">

                        {totalItemfrequentlyAskedQuestionss}
                      </p>
                    </div>
                  </div>
                </div>
              </div>



              {/* Card */}
              <div className=" items-center block   p-4 bg-white rounded-lg shadow-md lg:w-53 md:w-53	 mb-6">

                <div>
                  <div className="p-3 mr-0  flex  justify-end ">
                    <p className="mb-2 text-sm font-medium  text-right mr-3 text-[#827349]  ">
                      الخصومات
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.283" height="19" viewBox="0 0 20.283 19">
                      <path id="Union_2" data-name="Union 2" d="M10.149,20a1.7,1.7,0,0,1-1.131-.43L5.851,16.9H0V3.535A2.535,2.535,0,0,1,2.535,1H17.748a2.535,2.535,0,0,1,2.535,2.535V16.9H14.492L11.24,19.59a1.639,1.639,0,0,1-1.083.41ZM1.69,3.535V15.213H6.468l3.656,3.08,3.76-3.08h4.709V3.535a.846.846,0,0,0-.845-.845H2.535A.845.845,0,0,0,1.69,3.535ZM15.344,10.4l-1.1.8-.506-.367.422-1.3-1.105-.8.194-.595h1.366l.423-1.3.622,0,.422,1.3h1.366l.194.595-1.105.8.423,1.3-.507.367Zm-5.206,0-1.1.8-.506-.367.422-1.3-1.105-.8.194-.595H9.409l.422-1.3.623,0,.422,1.3h1.366l.194.595-1.105.8.422,1.3-.506.367Zm-5.207,0-1.1.8-.507-.367.423-1.3-1.105-.8.194-.595H4.2l.422-1.3.622,0,.423,1.3H7.036l.194.595-1.105.8.422,1.3-.506.367Z" transform="translate(0 -1)" fill="#827349" />
                    </svg>


                  </div>
                  <div className="flex  justify-center">
                    <div className="mr-5">
                      <p className="text-xs  text-[#909090]  w-full ">
                        الخصومات الجديدة
                      </p>
                      <p className="text-lg  text-gray-700  mt-3 text-center font-extrabold">
                        {last30DaysListOfferss.length}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs  text-[#909090]  w-full ">
                        مجموع  الخصومات
                      </p>
                      <p className="text-lg  text-black-700  mt-3 text-center font-extrabold">

                        {totalItemsOffer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card */}
              <div className=" items-center block   p-4 bg-white rounded-lg shadow-md lg:w-52 md:w-52	 mb-6">

                <div>
                  <div className="p-3 mr-0  flex  justify-end ">
                    <p className="mb-2 text-sm font-medium  text-right mr-3 text-[#827349]  ">
                      الشركات 
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17.417" viewBox="0 0 19 17.417">
                      <g id="_01_align_center" data-name="01 align center" transform="translate(0 -1)">
                        <path id="Path_6" data-name="Path 6" d="M16.625,2.583H9.687L6.52,1H2.375A2.375,2.375,0,0,0,0,3.375V18.417H19V4.958A2.375,2.375,0,0,0,16.625,2.583Zm-14.25,0H6.146L9.313,4.167h7.312a.792.792,0,0,1,.792.792V7.165L1.583,7.254V3.375a.792.792,0,0,1,.792-.792Zm-.792,14.25v-8l15.833-.089v8.085Z" transform="translate(0)" fill="#827349" />
                      </g>
                    </svg>

                  </div>
                  <div className="flex  justify-center">
                    <div className="mr-5">
                      <p className="text-xs  text-[#909090]  w-full ">
                        شركة الجديدة
                      </p>
                      <p className="text-lg  text-gray-700  mt-3 text-center font-extrabold">
                        {last30DaysListNewCompany.length}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-xs  text-[#909090]  w-full ">
                        مجموع  شركات
                      </p>
                      <p className="text-lg  text-black-700 mt-3 text-center font-extrabold">

                        {totalItemsNewCompany}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Header;
