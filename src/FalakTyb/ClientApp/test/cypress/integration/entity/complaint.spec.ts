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

describe("Complaint e2e test", () => {
  const complaintPageUrl = "/complaint";
  const complaintPageUrlPattern = new RegExp("/complaint(\\?.*)?$");
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const complaintSample = {};

  let complaint: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/complaints+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/complaints").as("postEntityRequest");
    cy.intercept("DELETE", "/api/complaints/*").as("deleteEntityRequest");
  });

  afterEach(() => {
    if (complaint) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/complaints/${complaint.id}`,
      }).then(() => {
        complaint = undefined;
      });
    }
  });

  it("Complaints menu should load Complaints page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("complaint");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("Complaint").should("exist");
    cy.url().should("match", complaintPageUrlPattern);
  });

  describe("Complaint page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(complaintPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create Complaint page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/complaint/new$"));
        cy.getEntityCreateUpdateHeading("Complaint");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", complaintPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/complaints",
          body: complaintSample,
        }).then(({ body }) => {
          complaint = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/complaints+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [complaint],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(complaintPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details Complaint page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("complaint");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", complaintPageUrlPattern);
      });

      it("edit button click should load edit Complaint page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("Complaint");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", complaintPageUrlPattern);
      });

      it("last delete button click should delete instance of Complaint", () => {
        cy.intercept("GET", "/api/complaints/*").as("dialogDeleteRequest");
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("complaint").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", complaintPageUrlPattern);

        complaint = undefined;
      });
    });
  });

  describe("new Complaint page", () => {
    beforeEach(() => {
      cy.visit(`${complaintPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("Complaint");
    });

    it("should create an instance of Complaint", () => {
      cy.get(`[data-cy="userId"]`).type("94897").should("have.value", "94897");

      cy.get(`[data-cy="userName"]`)
        .type("port deposit Kyat")
        .should("have.value", "port deposit Kyat");

      cy.get(`[data-cy="subject"]`)
        .type("haptic bandwidth wireless")
        .should("have.value", "haptic bandwidth wireless");

      cy.get(`[data-cy="complaintTextBody"]`)
        .type("client-server")
        .should("have.value", "client-server");

      cy.get(`[data-cy="date"]`)
        .type("2022-07-13")
        .should("have.value", "2022-07-13");

      cy.get(`[data-cy="about"]`)
        .type("Wooden Usability Bacon")
        .should("have.value", "Wooden Usability Bacon");

      cy.get(`[data-cy="phoneNumber"]`)
        .type("Granite monitor program")
        .should("have.value", "Granite monitor program");

      cy.get(`[data-cy="email"]`)
        .type("Jamarcus_Hudson57@gmail.com")
        .should("have.value", "Jamarcus_Hudson57@gmail.com");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        complaint = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", complaintPageUrlPattern);
    });
  });
});
