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

describe("Providers e2e test", () => {
  const providersPageUrl = "/providers";
  const providersPageUrlPattern = new RegExp("/providers(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const providersSample = {
    providerNameInEnglish: "Assistant Granite",
    providerNameInArabic: "Coordinator Borders interactive",
    latitude: "Movies Communications",
    longitude: "Savings Strategist generate",
    phoneNumber: "Unbranded port Global",
    address: "hacking",
    isActive: false,
  };

  let providers: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/providers+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/providers").as("postEntityRequest");
    cy.intercept("DELETE", "/api/providers/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (providers) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/providers/${providers.id}`,
      }).then(() => {
        providers = undefined;
      });
    }
  });

  it("Providers menu should load Providers page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("providers");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("Providers").should("exist");
    cy.url().should("match", providersPageUrlPattern);
  });

  describe("Providers page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(providersPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create Providers page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/providers/new$"));
        cy.getEntityCreateUpdateHeading("Providers");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/providers",
          body: providersSample,
        }).then(({ body }) => {
          providers = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/providers+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [providers],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(providersPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details Providers page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("providers");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersPageUrlPattern);
      });

      it("edit button click should load edit Providers page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("Providers");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersPageUrlPattern);
      });

      it("last delete button click should delete instance of Providers", () => {
        cy.intercept("GET", "/api/providers/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("providers").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", providersPageUrlPattern);

        providers = undefined;
      });
    });
  });

  describe("new Providers page", () => {
    beforeEach(() => {
      cy.visit(`${providersPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("Providers");
    });

    it("should create an instance of Providers", () => {
      cy.get(`[data-cy="providerNameInEnglish"]`)
        .type("Iran Rubber Account")
        .should("have.value", "Iran Rubber Account");

      cy.get(`[data-cy="providerNameInArabic"]`)
        .type("Shoes Ferry")
        .should("have.value", "Shoes Ferry");

      cy.get(`[data-cy="latitude"]`)
        .type("Engineer")
        .should("have.value", "Engineer");

      cy.get(`[data-cy="longitude"]`)
        .type("Directives green Keyboard")
        .should("have.value", "Directives green Keyboard");

      cy.get(`[data-cy="phoneNumber"]`)
        .type("Markets")
        .should("have.value", "Markets");

      cy.get(`[data-cy="email"]`)
        .type("Giuseppe.Hegmann@hotmail.com")
        .should("have.value", "Giuseppe.Hegmann@hotmail.com");

      cy.get(`[data-cy="providerImageUrl"]`)
        .type("Assurance solutions Kentucky")
        .should("have.value", "Assurance solutions Kentucky");

      cy.get(`[data-cy="address"]`)
        .type("asynchronous")
        .should("have.value", "asynchronous");

      cy.get(`[data-cy="isActive"]`).should("not.be.checked");
      cy.get(`[data-cy="isActive"]`).click().should("be.checked");

      cy.get(`[data-cy="isWeChooseForYou"]`).should("not.be.checked");
      cy.get(`[data-cy="isWeChooseForYou"]`).click().should("be.checked");

      cy.get(`[data-cy="isVip"]`).should("not.be.checked");
      cy.get(`[data-cy="isVip"]`).click().should("be.checked");

      cy.get(`[data-cy="note"]`)
        .type("Corporate Books")
        .should("have.value", "Corporate Books");

      cy.get(`[data-cy="itWillHaveSubProviders"]`).should("not.be.checked");
      cy.get(`[data-cy="itWillHaveSubProviders"]`).click().should("be.checked");

      cy.get(`[data-cy="addedBy"]`)
        .type("Emirates override")
        .should("have.value", "Emirates override");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-04")
        .should("have.value", "2022-06-04");

      cy.get(`[data-cy="mainServiceProviderId"]`)
        .type("66135")
        .should("have.value", "66135");

      cy.get(`[data-cy="keyWordsInEnglish"]`)
        .type("synergies")
        .should("have.value", "synergies");

      cy.get(`[data-cy="keyWordsInArabic"]`)
        .type("bifurcated 24/365 violet")
        .should("have.value", "bifurcated 24/365 violet");

      cy.get(`[data-cy="addressInArabic"]`)
        .type("SCSI")
        .should("have.value", "SCSI");

      cy.get(`[data-cy="providerCode"]`)
        .type("Internal Cross-group")
        .should("have.value", "Internal Cross-group");

      cy.get(`[data-cy="maximumUsageCode"]`)
        .type("68680")
        .should("have.value", "68680");

      cy.get(`[data-cy="websiteUrl"]`)
        .type("Congolese Interface")
        .should("have.value", "Congolese Interface");

      cy.get(`[data-cy="facebookUrl"]`)
        .type("Bangladesh Nigeria")
        .should("have.value", "Bangladesh Nigeria");

      cy.get(`[data-cy="instagramUrl"]`)
        .type("Leu")
        .should("have.value", "Leu");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        providers = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", providersPageUrlPattern);
    });
  });
});
