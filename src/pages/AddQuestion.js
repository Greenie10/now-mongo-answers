import React from "react";
import { useParams } from "react-router-dom";

import { AddQuestion } from "../Components/add-question";
import { InsertAnswer } from "../Components/update-question";

const AddQuestionsPage = () => {
  let { questionId } = useParams();

  return (
    <main>
      <h1>Add Questions</h1>
      <AddQuestion />
      <h2>Add Answers</h2>
      <InsertAnswer questionId={questionId} />
    </main>
  );
};

export default AddQuestionsPage;
