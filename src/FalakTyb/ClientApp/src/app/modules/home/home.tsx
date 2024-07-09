

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-jhipster";
import { Row, Col, Alert } from "reactstrap";
import DashboardCardContract from "../../partials/DashboardCardContract"
import { useAppSelector, useAppDispatch } from "app/config/store";
import DashboardCardReviews from "app/partials/DashboardCardReviews";
import DashboardCardRedeem from "app/partials/DashboardCardRedeem";

import { getEntitiesReviewsAndRating } from "app/entities/reviews-and-rating/reviews-and-rating.reducer";
import { getEntitiesMostRedeem } from "app/entities/redeem/redeem.reducer";
import { getEntitiescontracts } from "app/entities/contract/contract.reducer";

export const Home = () => {

  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const contractList = useAppSelector((state) => state.contract.entities);
  const loading = useAppSelector((state) => state.contract.loading);

  const reviewsAndRatingList = useAppSelector(
    (state) => state.reviewsAndRating.entities
  );
  //const loading = useAppSelector((state) => state.reviewsAndRating.loading);

  useEffect(() => {
    dispatch(getEntitiesReviewsAndRating({}));
  }, []);
  useEffect(() => {
    dispatch(getEntitiescontracts({}));
  }, []);


  const redeemList = useAppSelector((state) => state.redeem.entities);
 // const loading = useAppSelector((state) => state.redeem.loading);

  useEffect(() => {
    dispatch(getEntitiesMostRedeem({}));
  }, []);




  return (


    <div className="flex justify-center w-full mb-10 " >
      <div className="grid grid-row-4 grid-flow-col gap-8 h-auto	w-4/6 self-center " style={{ marginRight: "16%" }}>

        <div className=" row-span-2 rounded-lg w-full	">

          <DashboardCardReviews reviewsAndRatingList={reviewsAndRatingList} />
        </div>
        <div className=" row-span-2 rounded-lg w-full		">
          <DashboardCardRedeem redeemList={redeemList} />
        </div>
        <div className=" row-span-4 rounded-lg columns-xl w-full">
          <DashboardCardContract contractList={contractList} />

        </div>
      </div>
    </div>


  );
};

export default Home;
