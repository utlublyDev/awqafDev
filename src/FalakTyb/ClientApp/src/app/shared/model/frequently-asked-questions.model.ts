import dayjs from "dayjs";

export interface IFrequentlyAskedQuestions {
  id?: number;
  questionInEnglish?: string;
  questionInArabic?: string;
  answerInEnglish?: string;
  answerInArabic?: string;
  addedBy?: string | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<IFrequentlyAskedQuestions> = {};
