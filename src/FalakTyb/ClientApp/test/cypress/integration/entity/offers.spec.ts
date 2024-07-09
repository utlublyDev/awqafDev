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

describe("Offers e2e test", () => {
  const offersPageUrl = "/offers";
  const offersPageUrlPattern = new RegExp("/offers(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const offersSample = { providerId: "Regional", offerAmountPercentage: 94702 };

  let offers: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/offers+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/offers").as("postEntityRequest");
    cy.intercept("DELETE", "/api/offers/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (offers) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/offers/${offers.id}`,
      }).then(() => {
        offers = undefined;
      });
    }
  });

  it("Offers menu should load Offers page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("offers");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("Offers").should("exist");
    cy.url().should("match", offersPageUrlPattern);
  });

  describe("Offers page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(offersPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create Offers page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/offers/new$"));
        cy.getEntityCreateUpdateHeading("Offers");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/offers",
          body: offersSample,
        }).then(({ body }) => {
          offers = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/offers+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [offers],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(offersPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details Offers page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("offers");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersPageUrlPattern);
      });

      it("edit button click should load edit Offers page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("Offers");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersPageUrlPattern);
      });

      it("last delete button click should delete instance of Offers", () => {
        cy.intercept("GET", "/api/offers/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("offers").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", offersPageUrlPattern);

        offers = undefined;
      });
    });
  });

  describe("new Offers page", () => {
    beforeEach(() => {
      cy.visit(`${offersPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("Offers");
    });

    it("should create an instance of Offers", () => {
      cy.get(`[data-cy="providerId"]`)
        .type("actuating Forward")
        .should("have.value", "actuating Forward");

      cy.get(`[data-cy="subProviderId"]`)
        .type("neural")
        .should("have.value", "neural");

      cy.get(`[data-cy="offerNameInEnglish"]`)
        .type("Avon")
        .should("have.value", "Avon");

      cy.get(`[data-cy="offerNameInArabic"]`)
        .type("quantify red Honduras")
        .should("have.value", "quantify red Honduras");

      cy.get(`[data-cy="offerAmountPercentage"]`)
        .type("11800")
        .should("have.value", "11800");

      cy.get(`[data-cy="offerStartDate"]`)
        .type("2022-06-05T01:30")
        .should("have.value", "2022-06-05T01:30");

      cy.get(`[data-cy="offerEndDate"]`)
        .type("2022-06-05T09:47")
        .should("have.value", "2022-06-05T09:47");

      cy.get(`[data-cy="offerIsValidate"]`).should("not.be.checked");
      cy.get(`[data-cy="offerIsValidate"]`).click().should("be.checked");

      cy.get(`[data-cy="offerPrice"]`)
        .type("71987")
        .should("have.value", "71987");

      cy.get(`[data-cy="offerCode"]`)
        .type("sky quantify Ford")
        .should("have.value", "sky quantify Ford");

      cy.get(`[data-cy="location"]`)
        .type("Shirt")
        .should("have.value", "Shirt");

      cy.get(`[data-cy="offerDetailsInEnglish"]`)
        .type("superstructure")
        .should("have.value", "superstructure");

      cy.get(`[data-cy="offerDetailsInArabic"]`)
        .type("Shoes vortals")
        .should("have.value", "Shoes vortals");

      cy.get(`[data-cy="addedBy"]`)
        .type("calculate International Indiana")
        .should("have.value", "calculate International Indiana");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(`[data-cy="websiteUrl"]`)
        .type("Baby")
        .should("have.value", "Baby");

      cy.get(`[data-cy="locationInArabic"]`)
        .type("Corporate card Cambridgeshire")
        .should("have.value", "Corporate card Cambridgeshire");

      cy.get(`[data-cy="latitude"]`)
        .type("optical")
        .should("have.value", "optical");

      cy.get(`[data-cy="longitude"]`)
        .type("Malawi generating")
        .should("have.value", "Malawi generating");

      cy.get(`[data-cy="isWebsiteOrApp"]`).should("not.be.checked");
      cy.get(`[data-cy="isWebsiteOrApp"]`).click().should("be.checked");

      cy.get(`[data-cy="offerImageUrl"]`)
        .type("Configuration Carolina Internal")
        .should("have.value", "Configuration Carolina Internal");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        offers = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", offersPageUrlPattern);
    });
  });
});
