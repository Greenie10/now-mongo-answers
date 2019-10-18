import React from "react";
import { GetAllQuestions } from "../Components/list-questions";

const QuestionsPage = () => {
  return (
    <main>
      <h1>Questions</h1>
      <GetAllQuestions />
    </main>
  );
};

export default QuestionsPage;
