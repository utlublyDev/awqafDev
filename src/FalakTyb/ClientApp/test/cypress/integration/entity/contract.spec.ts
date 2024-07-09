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

describe("Contract e2e test", () => {
  const contractPageUrl = "/contract";
  const contractPageUrlPattern = new RegExp("/contract(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const contractSample = {
    contractStartDate: "2022-06-04",
    contractEndDate: "2022-06-05",
  };

  let contract: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/contracts+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/contracts").as("postEntityRequest");
    cy.intercept("DELETE", "/api/contracts/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (contract) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/contracts/${contract.id}`,
      }).then(() => {
        contract = undefined;
      });
    }
  });

  it("Contracts menu should load Contracts page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("contract");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("Contract").should("exist");
    cy.url().should("match", contractPageUrlPattern);
  });

  describe("Contract page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(contractPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create Contract page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/contract/new$"));
        cy.getEntityCreateUpdateHeading("Contract");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", contractPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/contracts",
          body: contractSample,
        }).then(({ body }) => {
          contract = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/contracts+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [contract],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(contractPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details Contract page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("contract");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", contractPageUrlPattern);
      });

      it("edit button click should load edit Contract page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("Contract");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", contractPageUrlPattern);
      });

      it("last delete button click should delete instance of Contract", () => {
        cy.intercept("GET", "/api/contracts/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("contract").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", contractPageUrlPattern);

        contract = undefined;
      });
    });
  });

  describe("new Contract page", () => {
    beforeEach(() => {
      cy.visit(`${contractPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("Contract");
    });

    it("should create an instance of Contract", () => {
      cy.get(`[data-cy="contractDescription"]`)
        .type("Lead open-source Pre-emptive")
        .should("have.value", "Lead open-source Pre-emptive");

      cy.get(`[data-cy="contactNumber"]`)
        .type("Money Shirt")
        .should("have.value", "Money Shirt");

      cy.get(`[data-cy="email"]`)
        .type("Brandi.Trantow@yahoo.com")
        .should("have.value", "Brandi.Trantow@yahoo.com");

      cy.get(`[data-cy="status"]`).should("not.be.checked");
      cy.get(`[data-cy="status"]`).click().should("be.checked");

      cy.get(`[data-cy="contractStartDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(`[data-cy="contractEndDate"]`)
        .type("2022-06-04")
        .should("have.value", "2022-06-04");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        contract = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", contractPageUrlPattern);
    });
  });
});
