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

describe("ProvidersCategories e2e test", () => {
  const providersCategoriesPageUrl = "/providers-categories";
  const providersCategoriesPageUrlPattern = new RegExp(
    "/providers-categories(\\?.*)?$"
  );
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const providersCategoriesSample = {
    providersCategorieNameInEnglish: "Awesome",
    providersCategorieNameInArabic: "Islands Sausages",
  };

  let providersCategories: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/providers-categories+(?*|)").as(
      "entitiesRequest"
    );
    cy.intercept("POST", "/api/providers-categories").as("postEntityRequest");
    cy.intercept("DELETE", "/api/providers-categories/*").as(
      "deleteEntityRequest"
    );
  });

  afterEach(() => {
    if (providersCategories) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/providers-categories/${providersCategories.id}`,
      }).then(() => {
        providersCategories = undefined;
      });
    }
  });

  it("ProvidersCategories menu should load ProvidersCategories page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("providers-categories");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("ProvidersCategories").should("exist");
    cy.url().should("match", providersCategoriesPageUrlPattern);
  });

  describe("ProvidersCategories page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(providersCategoriesPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create ProvidersCategories page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/providers-categories/new$"));
        cy.getEntityCreateUpdateHeading("ProvidersCategories");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersCategoriesPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/providers-categories",
          body: providersCategoriesSample,
        }).then(({ body }) => {
          providersCategories = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/providers-categories+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [providersCategories],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(providersCategoriesPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details ProvidersCategories page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("providersCategories");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersCategoriesPageUrlPattern);
      });

      it("edit button click should load edit ProvidersCategories page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("ProvidersCategories");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersCategoriesPageUrlPattern);
      });

      it("last delete button click should delete instance of ProvidersCategories", () => {
        cy.intercept("GET", "/api/providers-categories/*").as(
          "dialogDeleteRequest"
        );
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("providersCategories").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersCategoriesPageUrlPattern);

        providersCategories = undefined;
      });
    });
  });

  describe("new ProvidersCategories page", () => {
    beforeEach(() => {
      cy.visit(`${providersCategoriesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("ProvidersCategories");
    });

    it("should create an instance of ProvidersCategories", () => {
      cy.get(`[data-cy="providersCategorieNameInEnglish"]`)
        .type("Savings")
        .should("have.value", "Savings");

      cy.get(`[data-cy="providersCategorieNameInArabic"]`)
        .type("Guilder Automotive Buckinghamshire")
        .should("have.value", "Guilder Automotive Buckinghamshire");

      cy.get(`[data-cy="providersCategorieIconUrl"]`)
        .type("Multi-layered scalable")
        .should("have.value", "Multi-layered scalable");

      cy.get(`[data-cy="itWillHaveHoldingCompaniesb"]`).should(
        "not.be.checked"
      );
      cy.get(`[data-cy="itWillHaveHoldingCompaniesb"]`)
        .click()
        .should("be.checked");

      cy.get(`[data-cy="addedBy"]`)
        .type("Bedfordshire harness empowering")
        .should("have.value", "Bedfordshire harness empowering");

      cy.get(`[data-cy="status"]`).should("not.be.checked");
      cy.get(`[data-cy="status"]`).click().should("be.checked");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-04")
        .should("have.value", "2022-06-04");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        providersCategories = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", providersCategoriesPageUrlPattern);
    });
  });
});
