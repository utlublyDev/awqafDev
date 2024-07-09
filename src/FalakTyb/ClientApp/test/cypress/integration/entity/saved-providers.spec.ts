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

describe("SavedProviders e2e test", () => {
  const savedProvidersPageUrl = "/saved-providers";
  const savedProvidersPageUrlPattern = new RegExp("/saved-providers(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const savedProvidersSample = { userIdAwqaf: "Multi-channelled" };

  let savedProviders: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/saved-providers+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/saved-providers").as("postEntityRequest");
    cy.intercept("DELETE", "/api/saved-providers/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (savedProviders) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/saved-providers/${savedProviders.id}`,
      }).then(() => {
        savedProviders = undefined;
      });
    }
  });

  it("SavedProviders menu should load SavedProviders page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("saved-providers");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("SavedProviders").should("exist");
    cy.url().should("match", savedProvidersPageUrlPattern);
  });

  describe("SavedProviders page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(savedProvidersPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create SavedProviders page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/saved-providers/new$"));
        cy.getEntityCreateUpdateHeading("SavedProviders");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", savedProvidersPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/saved-providers",
          body: savedProvidersSample,
        }).then(({ body }) => {
          savedProviders = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/saved-providers+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [savedProviders],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(savedProvidersPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details SavedProviders page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("savedProviders");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", savedProvidersPageUrlPattern);
      });

      it("edit button click should load edit SavedProviders page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("SavedProviders");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", savedProvidersPageUrlPattern);
      });

      it("last delete button click should delete instance of SavedProviders", () => {
        cy.intercept("GET", "/api/saved-providers/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("savedProviders").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", savedProvidersPageUrlPattern);

        savedProviders = undefined;
      });
    });
  });

  describe("new SavedProviders page", () => {
    beforeEach(() => {
      cy.visit(`${savedProvidersPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("SavedProviders");
    });

    it("should create an instance of SavedProviders", () => {
      cy.get(`[data-cy="userIdAwqaf"]`)
        .type("Customer-focused")
        .should("have.value", "Customer-focused");

      cy.get(`[data-cy="providerId"]`)
        .type("capacitor Business-focused invoice")
        .should("have.value", "capacitor Business-focused invoice");

      cy.get(`[data-cy="subProviderId"]`)
        .type("Soap")
        .should("have.value", "Soap");

      cy.get(`[data-cy="offerId"]`)
        .type("HTTP Cotton")
        .should("have.value", "HTTP Cotton");

      cy.get(`[data-cy="isOffer"]`).should("not.be.checked");
      cy.get(`[data-cy="isOffer"]`).click().should("be.checked");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        savedProviders = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", savedProvidersPageUrlPattern);
    });
  });
});
