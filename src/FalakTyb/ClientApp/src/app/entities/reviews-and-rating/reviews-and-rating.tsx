import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getSortState, Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { IReviewsAndRating } from "app/shared/model/reviews-and-rating.model";
import { getEntities } from "./reviews-and-rating.reducer";
import Pagination from "app/shared/pagination/pagination";
import { DESC, ITEMS_PER_PAGE, SORT } from "app/shared/util/pagination.constants";
import { SearchIcon } from "@heroicons/react/solid";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { getEntitiesOffers } from "../offers/offers.reducer";

export const ReviewsAndRating = (
  props: RouteComponentProps<{ url: string }>
) => {
  const dispatch = useAppDispatch();
  const [word,setWord] = useState("")
  const reviewsAndRatingList = useAppSelector(
    (state) => state.reviewsAndRating.entities
  );
  const loading = useAppSelector((state) => state.reviewsAndRating.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(props.location, ITEMS_PER_PAGE, "id"),
      props.location.search
    )
  );


  const getEntitiesReviewsAndRating = () => {
    dispatch(
      getEntities({
        page: pagination.activePage - 1,
        size: word===""?pagination.itemsPerPage:10000,
        sort: `${pagination.sort},${DESC}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${DESC}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    dispatch(
      getEntitiesOffers({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${DESC}`,
      })
    );


    
    getEntitiesReviewsAndRating();
  }, [pagination.activePage,DESC, pagination.sort,word]);



  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get("page");
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(",");
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = (p) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === DESC ? DESC : DESC,
      sort: p,
    });

  const handlePagination = (currentPage) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

 





  const providers = useAppSelector((state) => state.providers.entities);

  const offersList = useAppSelector((state) => state.offers.entities);


  const totalItems = useAppSelector((state) => state.reviewsAndRating.totalItems)


  const filtered = reviewsAndRatingList.filter(reviewsAndRating => {
    return word===""?reviewsAndRating:reviewsAndRating.userIdAwqaf.toString().startsWith(word)  ;
  });





  const { match } = props;

  return (
    <div className="px-4 sm:px-6 lg:px-8  flex justify-center  flex-col  container ml-8   " style={{ width: "78%" }}>
    <div className="sm:flex sm:items-center ">
 
      <div className="flex-1 flex items-center justify-center px-2  lg:justify-start">
        {/* <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#827349] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#827349]focus:outline-none focus:ring-2 focus:ring-[#827349] focus:ring-offset-2 sm:w-auto"
        >
          البحث
        </button> */}
        <div className="max-w-lg w-full lg:max-w-xs ml-3 mt-5">

          <label htmlFor="search" className="sr-only text-right">
            البحث
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-[#9D8D60]" aria-hidden="true" />
            </div>
            <input
              dir="rtl"
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border-transparent bg-white rounded-lg shadow-sm   placeholder-gray-500   sm:text-sm placeholder:text-left"
              placeholder="البحث"
              type="search"
              onChange={(e) => {setWord(e.target.value)}}

            />
          </div>
        </div>
      </div>
      <div className="sm:flex-auto text-right">
        <h1 className="text-xl font-semibold text-gray-900"> التقييمات</h1>

      </div>

    </div>
    <div className=" flex flex-col border-transparent shadow-md " dir="rtl" >
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    <a href="#" className="group inline-flex">
                    اسم الموظف                     
                     <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    كود الخصم                     
                     <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    مقدم الخدمة                      
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
             
         
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    التقييم
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                    التعليق                     
                     <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                      </span>
                    </a>
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">

                {filtered.map(reviewsAndRating => {
 const provider=providers.find(
  (it) => it.id.toString() === reviewsAndRating.providerId.toString()
)
const offer=offersList.find(
  (it) => it.id.toString() === reviewsAndRating.offerId.toString()
)


                  return (
                    <tr key={`entity-${reviewsAndRating.id}`} >
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reviewsAndRating.userIdAwqaf}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer&&offer.offerCode}</td>  
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{provider&&provider.providerNameInArabic}</td> 




                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex">
                      {[...new Array(reviewsAndRating.rating)].map((arr, index) => {
                            return <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16.642" height="16" viewBox="0 0 16.642 16"  >
                              <path id="star" d="M13.409,16.122,8.258,12.336,3.107,16.122l1.978-6.114L-.063,6.246H6.293L8.258.122l1.965,6.124h6.355l-5.148,3.762Z" transform="translate(0.063 -0.122)" fill="#909090" />
                            </svg>
                          })}</td>   
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reviewsAndRating.review}</td>
                    
                  
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>






    <Pagination
      postsPerPage={ITEMS_PER_PAGE}
      totalPosts={totalItems}
      paginate={handlePagination}
    />


  </div>
  );
};

export default ReviewsAndRating;
