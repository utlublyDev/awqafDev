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

describe("OffersCategories e2e test", () => {
  const offersCategoriesPageUrl = "/offers-categories";
  const offersCategoriesPageUrlPattern = new RegExp(
    "/offers-categories(\\?.*)?$"
  );
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const offersCategoriesSample = {
    offerCategorieNameInEnglish: "HTTP",
    offerCategorieNameInArabic: "payment Forest",
  };

  let offersCategories: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/offers-categories+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/offers-categories").as("postEntityRequest");
    cy.intercept("DELETE", "/api/offers-categories/*").as(
      "deleteEntityRequest"
    );
  });

  afterEach(() => {
    if (offersCategories) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/offers-categories/${offersCategories.id}`,
      }).then(() => {
        offersCategories = undefined;
      });
    }
  });

  it("OffersCategories menu should load OffersCategories page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("offers-categories");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("OffersCategories").should("exist");
    cy.url().should("match", offersCategoriesPageUrlPattern);
  });

  describe("OffersCategories page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(offersCategoriesPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create OffersCategories page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/offers-categories/new$"));
        cy.getEntityCreateUpdateHeading("OffersCategories");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersCategoriesPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/offers-categories",
          body: offersCategoriesSample,
        }).then(({ body }) => {
          offersCategories = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/offers-categories+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [offersCategories],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(offersCategoriesPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details OffersCategories page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("offersCategories");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersCategoriesPageUrlPattern);
      });

      it("edit button click should load edit OffersCategories page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("OffersCategories");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersCategoriesPageUrlPattern);
      });

      it("last delete button click should delete instance of OffersCategories", () => {
        cy.intercept("GET", "/api/offers-categories/*").as(
          "dialogDeleteRequest"
        );
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("offersCategories").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersCategoriesPageUrlPattern);

        offersCategories = undefined;
      });
    });
  });

  describe("new OffersCategories page", () => {
    beforeEach(() => {
      cy.visit(`${offersCategoriesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("OffersCategories");
    });

    it("should create an instance of OffersCategories", () => {
      cy.get(`[data-cy="offerCategorieNameInEnglish"]`)
        .type("Tools")
        .should("have.value", "Tools");

      cy.get(`[data-cy="offerCategorieNameInArabic"]`)
        .type("Public-key Global")
        .should("have.value", "Public-key Global");

      cy.get(`[data-cy="offerCategorieIconUrl"]`)
        .type("Customer")
        .should("have.value", "Customer");

      cy.get(`[data-cy="addedBy"]`)
        .type("deposit Assurance withdrawal")
        .should("have.value", "deposit Assurance withdrawal");

      cy.get(`[data-cy="status"]`).should("not.be.checked");
      cy.get(`[data-cy="status"]`).click().should("be.checked");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(`[data-cy="offerProviderId"]`)
        .type("12551")
        .should("have.value", "12551");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        offersCategories = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", offersCategoriesPageUrlPattern);
    });
  });
});
