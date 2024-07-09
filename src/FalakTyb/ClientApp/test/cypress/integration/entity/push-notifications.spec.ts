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

describe("PushNotifications e2e test", () => {
  const pushNotificationsPageUrl = "/push-notifications";
  const pushNotificationsPageUrlPattern = new RegExp(
    "/push-notifications(\\?.*)?$"
  );
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const pushNotificationsSample = { header: "silver" };

  let pushNotifications: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/push-notifications+(?*|)").as("entitiesRequest");
    cy.intercept("POST", "/api/push-notifications").as("postEntityRequest");
    cy.intercept("DELETE", "/api/push-notifications/*").as(
      "deleteEntityRequest"
    );
  });

  afterEach(() => {
    if (pushNotifications) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/push-notifications/${pushNotifications.id}`,
      }).then(() => {
        pushNotifications = undefined;
      });
    }
  });

  it("PushNotifications menu should load PushNotifications page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("push-notifications");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("PushNotifications").should("exist");
    cy.url().should("match", pushNotificationsPageUrlPattern);
  });

  describe("PushNotifications page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(pushNotificationsPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create PushNotifications page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should("match", new RegExp("/push-notifications/new$"));
        cy.getEntityCreateUpdateHeading("PushNotifications");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", pushNotificationsPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/push-notifications",
          body: pushNotificationsSample,
        }).then(({ body }) => {
          pushNotifications = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/push-notifications+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [pushNotifications],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(pushNotificationsPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details PushNotifications page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("pushNotifications");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", pushNotificationsPageUrlPattern);
      });

      it("edit button click should load edit PushNotifications page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("PushNotifications");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", pushNotificationsPageUrlPattern);
      });

      it("last delete button click should delete instance of PushNotifications", () => {
        cy.intercept("GET", "/api/push-notifications/*").as(
          "dialogDeleteRequest"
        );
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("pushNotifications").should("exist");
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", pushNotificationsPageUrlPattern);

        pushNotifications = undefined;
      });
    });
  });

  describe("new PushNotifications page", () => {
    beforeEach(() => {
      cy.visit(`${pushNotificationsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("PushNotifications");
    });

    it("should create an instance of PushNotifications", () => {
      cy.get(`[data-cy="header"]`)
        .type("Berkshire support multi-byte")
        .should("have.value", "Berkshire support multi-byte");

      cy.get(`[data-cy="details"]`)
        .type("Fresh Savings indigo")
        .should("have.value", "Fresh Savings indigo");

      cy.get(`[data-cy="sentBy"]`)
        .type("Fantastic paradigms")
        .should("have.value", "Fantastic paradigms");

      cy.get(`[data-cy="sentDate"]`)
        .type("2022-06-05")
        .should("have.value", "2022-06-05");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        pushNotifications = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", pushNotificationsPageUrlPattern);
    });
  });
});
