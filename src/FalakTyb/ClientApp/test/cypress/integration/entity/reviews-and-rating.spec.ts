import { entityItemSelector } from "../../support/commands";
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from "../../support/entity";

describe("ReviewsAndRating e2e test", () => {
  const reviewsAndRatingPageUrl = "/reviews-and-rating";
  const reviewsAndRatingPageUrlPattern = new RegExp(
    "/reviews-and-rating(\\?.*)?$"
  );
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const reviewsAndRatingSample = {};

  let reviewsAndRating: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/reviews-and-ratings+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/reviews-and-ratings").as("postEntityRequest");
    cy.intercept("DELETE", "/api/reviews-and-ratings/*").as(
      "deleteEntityRequest"
    );
  });

  afterEach(() => {
    if (reviewsAndRating) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/reviews-and-ratings/${reviewsAndRating.id}`,
      }).then(() => {
        reviewsAndRating = undefined;
      });
    }
  });

  it("ReviewsAndRatings menu should load ReviewsAndRatings page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("reviews-and-rating");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("ReviewsAndRating").should("exist");
    cy.url().should("match", reviewsAndRatingPageUrlPattern);
  });

  describe("ReviewsAndRating page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(reviewsAndRatingPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create ReviewsAndRating page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/reviews-and-rating/new$"));
        cy.getEntityCreateUpdateHeading("ReviewsAndRating");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", reviewsAndRatingPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/reviews-and-ratings",
          body: reviewsAndRatingSample,
        }).then(({ body }) => {
          reviewsAndRating = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/reviews-and-ratings+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [reviewsAndRating],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(reviewsAndRatingPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details ReviewsAndRating page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("reviewsAndRating");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", reviewsAndRatingPageUrlPattern);
      });

      it("edit button click should load edit ReviewsAndRating page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("ReviewsAndRating");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", reviewsAndRatingPageUrlPattern);
      });

      it("last delete button click should delete instance of ReviewsAndRating", () => {
        cy.intercept("GET", "/api/reviews-and-ratings/*").as(
          "dialogDeleteRequest"
        );
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("reviewsAndRating").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", reviewsAndRatingPageUrlPattern);

        reviewsAndRating = undefined;
      });
    });
  });

  describe("new ReviewsAndRating page", () => {
    beforeEach(() => {
      cy.visit(`${reviewsAndRatingPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("ReviewsAndRating");
    });

    it("should create an instance of ReviewsAndRating", () => {
      cy.get(`[data-cy="userIdAwqaf"]`)
        .type("white out-of-the-box morph")
        .should("have.value", "white out-of-the-box morph");

      cy.get(`[data-cy="providerId"]`)
        .type("Consultant web teal")
        .should("have.value", "Consultant web teal");

      cy.get(`[data-cy="offerId"]`).type("Metal").should("have.value", "Metal");

      cy.get(`[data-cy="review"]`)
        .type("National")
        .should("have.value", "National");

      cy.get(`[data-cy="rating"]`).type("42908").should("have.value", "42908");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        reviewsAndRating = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", reviewsAndRatingPageUrlPattern);
    });
  });
});
