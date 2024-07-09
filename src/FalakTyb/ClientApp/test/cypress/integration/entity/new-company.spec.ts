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

describe("NewCompany e2e test", () => {
  const newCompanyPageUrl = "/new-company";
  const newCompanyPageUrlPattern = new RegExp("/new-company(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const newCompanySample = {
    name: "Chief",
    companyName: "Supervisor",
    address: "port driver",
    phoneNumber: "indexing green",
    email: "Melvin.Schaden83@hotmail.com",
    companyType: "Checking bypass and",
    commercialRegistrationNo: "e-commerce",
    tradeLicenseNumber: "FTP paradigms maroon",
  };

  let newCompany: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/new-companies+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/new-companies").as("postEntityRequest");
    cy.intercept("DELETE", "/api/new-companies/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (newCompany) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/new-companies/${newCompany.id}`,
      }).then(() => {
        newCompany = undefined;
      });
    }
  });

  it("NewCompanies menu should load NewCompanies page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("new-company");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("NewCompany").should("exist");
    cy.url().should("match", newCompanyPageUrlPattern);
  });

  describe("NewCompany page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(newCompanyPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create NewCompany page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/new-company/new$"));
        cy.getEntityCreateUpdateHeading("NewCompany");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", newCompanyPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/new-companies",
          body: newCompanySample,
        }).then(({ body }) => {
          newCompany = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/new-companies+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [newCompany],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(newCompanyPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details NewCompany page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("newCompany");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", newCompanyPageUrlPattern);
      });

      it("edit button click should load edit NewCompany page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("NewCompany");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", newCompanyPageUrlPattern);
      });

      it("last delete button click should delete instance of NewCompany", () => {
        cy.intercept("GET", "/api/new-companies/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("newCompany").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", newCompanyPageUrlPattern);

        newCompany = undefined;
      });
    });
  });

  describe("new NewCompany page", () => {
    beforeEach(() => {
      cy.visit(`${newCompanyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("NewCompany");
    });

    it("should create an instance of NewCompany", () => {
      cy.get(`[data-cy="name"]`).type("Agent").should("have.value", "Agent");

      cy.get(`[data-cy="companyName"]`)
        .type("open-source Auto PNG")
        .should("have.value", "open-source Auto PNG");

      cy.get(`[data-cy="address"]`)
        .type("Wooden Account Industrial")
        .should("have.value", "Wooden Account Industrial");

      cy.get(`[data-cy="phoneNumber"]`)
        .type("Verde Tools")
        .should("have.value", "Verde Tools");

      cy.get(`[data-cy="email"]`)
        .type("Kianna_Bailey@gmail.com")
        .should("have.value", "Kianna_Bailey@gmail.com");

      cy.get(`[data-cy="companyType"]`)
        .type("neural out-of-the-box contextually-based")
        .should("have.value", "neural out-of-the-box contextually-based");

      cy.get(`[data-cy="commercialRegistrationNo"]`)
        .type("online Keyboard")
        .should("have.value", "online Keyboard");

      cy.get(`[data-cy="tradeLicenseNumber"]`)
        .type("Account calculating")
        .should("have.value", "Account calculating");

      cy.get(`[data-cy="serviceType"]`)
        .type("Way District")
        .should("have.value", "Way District");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-07-13")
        .should("have.value", "2022-07-13");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        newCompany = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", newCompanyPageUrlPattern);
    });
  });
});
