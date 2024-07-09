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

describe("FrequentlyAskedQuestions e2e test", () => {
  const frequentlyAskedQuestionsPageUrl = "/frequently-asked-questions";
  const frequentlyAskedQuestionsPageUrlPattern = new RegExp(
    "/frequently-asked-questions(\\?.*)?$"
  );
  const username = Cypress.env("E2E_USERNAME") ?? "user";
  const password = Cypress.env("E2E_PASSWORD") ?? "user";
  const frequentlyAskedQuestionsSample = {
    questionInEnglish: "Checking Regional gold",
    questionInArabic: "card Rupee collaborative",
    answerInEnglish: "methodical Central",
    answerInArabic: "bifurcated",
  };

  let frequentlyAskedQuestions: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept("GET", "/api/frequently-asked-questions+(?*|)").as(
      "entitiesRequest"
    );
    cy.intercept("POST", "/api/frequently-asked-questions").as(
      "postEntityRequest"
    );
    cy.intercept("DELETE", "/api/frequently-asked-questions/*").as(
      "deleteEntityRequest"
    );
  });

  afterEach(() => {
    if (frequentlyAskedQuestions) {
      cy.authenticatedRequest({
        method: "DELETE",
        url: `/api/frequently-asked-questions/${frequentlyAskedQuestions.id}`,
      }).then(() => {
        frequentlyAskedQuestions = undefined;
      });
    }
  });

  it("FrequentlyAskedQuestions menu should load FrequentlyAskedQuestions page", () => {
    cy.visit("/");
    cy.clickOnEntityMenuItem("frequently-asked-questions");
    cy.wait("@entitiesRequest").then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should("not.exist");
      } else {
        cy.get(entityTableSelector).should("exist");
      }
    });
    cy.getEntityHeading("FrequentlyAskedQuestions").should("exist");
    cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);
  });

  describe("FrequentlyAskedQuestions page", () => {
    describe("create button click", () => {
      beforeEach(() => {
        cy.visit(frequentlyAskedQuestionsPageUrl);
        cy.wait("@entitiesRequest");
      });

      it("should load create FrequentlyAskedQuestions page", () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should(
          "match",
          new RegExp("/frequently-asked-questions/new$")
        );
        cy.getEntityCreateUpdateHeading("FrequentlyAskedQuestions");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);
      });
    });

    describe("with existing value", () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: "POST",
          url: "/api/frequently-asked-questions",
          body: frequentlyAskedQuestionsSample,
        }).then(({ body }) => {
          frequentlyAskedQuestions = body;

          cy.intercept(
            {
              method: "GET",
              url: "/api/frequently-asked-questions+(?*|)",
              times: 1,
            },
            {
              statusCode: 200,
              body: [frequentlyAskedQuestions],
            }
          ).as("entitiesRequestInternal");
        });

        cy.visit(frequentlyAskedQuestionsPageUrl);

        cy.wait("@entitiesRequestInternal");
      });

      it("detail button click should load details FrequentlyAskedQuestions page", () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading("frequentlyAskedQuestions");
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);
      });

      it("edit button click should load edit FrequentlyAskedQuestions page", () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading("FrequentlyAskedQuestions");
        cy.get(entityCreateSaveButtonSelector).should("exist");
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);
      });

      it("last delete button click should delete instance of FrequentlyAskedQuestions", () => {
        cy.intercept("GET", "/api/frequently-asked-questions/*").as(
          "dialogDeleteRequest"
        );
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait("@dialogDeleteRequest");
        cy.getEntityDeleteDialogHeading("frequentlyAskedQuestions").should(
          "exist"
        );
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait("@deleteEntityRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait("@entitiesRequest").then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);

        frequentlyAskedQuestions = undefined;
      });
    });
  });

  describe("new FrequentlyAskedQuestions page", () => {
    beforeEach(() => {
      cy.visit(`${frequentlyAskedQuestionsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading("FrequentlyAskedQuestions");
    });

    it("should create an instance of FrequentlyAskedQuestions", () => {
      cy.get(`[data-cy="questionInEnglish"]`)
        .type("models Unbranded transmit")
        .should("have.value", "models Unbranded transmit");

      cy.get(`[data-cy="questionInArabic"]`)
        .type("RAM Functionality Practical")
        .should("have.value", "RAM Functionality Practical");

      cy.get(`[data-cy="answerInEnglish"]`)
        .type("index solid")
        .should("have.value", "index solid");

      cy.get(`[data-cy="answerInArabic"]`)
        .type("Pants")
        .should("have.value", "Pants");

      cy.get(`[data-cy="addedBy"]`)
        .type("bypassing Missouri")
        .should("have.value", "bypassing Missouri");

      cy.get(`[data-cy="creationDate"]`)
        .type("2022-06-04")
        .should("have.value", "2022-06-04");

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait("@postEntityRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        frequentlyAskedQuestions = response!.body;
      });
      cy.wait("@entitiesRequest").then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should("match", frequentlyAskedQuestionsPageUrlPattern);
    });
  });
});
