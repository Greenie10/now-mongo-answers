import React from "react";
import { AddQuestion } from "../Components/add-question";
import { InsertAnswer } from "../Components/update-question";

const AddQuestionsPage = props => {
  return (
    <main>
      <h1>Add Questions</h1>
      <AddQuestion />
      <h2>Add Answers</h2>
      <InsertAnswer {...props} />
    </main>
  );
};

export default AddQuestionsPage;
