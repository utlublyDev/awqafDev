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

describe("SubProviders e2e test", () => {
  const subProvidersPageUrl = "/sub-providers";
  const subProvidersPageUrlPattern = new RegExp("/sub-providers(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const subProvidersSample = {
    providerNameInEnglish: "Granite",
    providerNameInArabic: "transmit Wooden set",
    latitude: "Central Soft",
    longitude: "vortals firewall",
    phoneNumber: "Developer Liaison Producer",
    address: "Avon",
    isActive: false,
  };

  let subProviders: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/sub-providers+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/sub-providers").as("postEntityRequest");
    cy.intercept("DELETE", "/api/sub-providers/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (subProviders) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/sub-providers/${subProviders.id}`,
      }).then(() => {
        subProviders = undefined;
      });
    }
  });

  it("SubProviders menu should load SubProviders page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("sub-providers");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("SubProviders").should("exist");
    cy.url().should("match", subProvidersPageUrlPattern);
  });

  describe("SubProviders page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(subProvidersPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create SubProviders page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/sub-providers/new$"));
        cy.getEntityCreateUpdateHeading("SubProviders");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", subProvidersPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/sub-providers",
          body: subProvidersSample,
        }).then(({ body }) => {
          subProviders = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/sub-providers+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [subProviders],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(subProvidersPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details SubProviders page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("subProviders");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", subProvidersPageUrlPattern);
      });

      it("edit button click should load edit SubProviders page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("SubProviders");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", subProvidersPageUrlPattern);
      });

      it("last delete button click should delete instance of SubProviders", () => {
        cy.intercept("GET", "/api/sub-providers/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("subProviders").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", subProvidersPageUrlPattern);

        subProviders = undefined;
      });
    });
  });

  describe("new SubProviders page", () => {
    beforeEach(() => {
      cy.visit(`${subProvidersPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("SubProviders");
    });

    it("should create an instance of SubProviders", () => {
      cy.get(`[data-cy="providerNameInEnglish"]`)
        .type("parse")
        .should("have.value", "parse");

      cy.get(`[data-cy="providerNameInArabic"]`)
        .type("Legacy Stand-alone")
        .should("have.value", "Legacy Stand-alone");

      cy.get(`[data-cy="latitude"]`)
        .type("enable Indonesia Data")
        .should("have.value", "enable Indonesia Data");

      cy.get(`[data-cy="longitude"]`)
        .type("Metal")
        .should("have.value", "Metal");

      cy.get(`[data-cy="phoneNumber"]`)
        .type("Loan")
        .should("have.value", "Loan");

      cy.get(`[data-cy="email"]`)
        .type("Rollin87@gmail.com")
        .should("have.value", "Rollin87@gmail.com");

      cy.get(`[data-cy="providerImageUrl"]`)
        .type("analyzer Grass-roots generate")
        .should("have.value", "analyzer Grass-roots generate");

      cy.get(`[data-cy="address"]`)
        .type("Soap synthesizing XSS")
        .should("have.value", "Soap synthesizing XSS");

      cy.get(`[data-cy="isActive"]`).should("not.be.checked");
      cy.get(`[data-cy="isActive"]`).click().should("be.checked");

      cy.get(`[data-cy="isWeChooseForYou"]`).should("not.be.checked");
      cy.get(`[data-cy="isWeChooseForYou"]`).click().should("be.checked");

      cy.get(`[data-cy="isVip"]`).should("not.be.checked");
      cy.get(`[data-cy="isVip"]`).click().should("be.checked");

      cy.get(`[data-cy="note"]`)
        .type("out-of-the-box Account Soft")
        .should("have.value", "out-of-the-box Account Soft");

      cy.get(`[data-cy="addedBy"]`)
        .type("Leone bluetooth Principal")
        .should("have.value", "Leone bluetooth Principal");

      cy.get(`[data-cy="itWillHaveHoldingCompanies"]`).should("not.be.checked");
      cy.get(`[data-cy="itWillHaveHoldingCompanies"]`)
        .click()
        .should("be.checked");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        subProviders = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", subProvidersPageUrlPattern);
    });
  });
});
