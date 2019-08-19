import React from "react";

const Answer = response => {
  const { Gardener, AnAnswer } = response.answer;

  return (
    <p>
      <strong>{Gardener}</strong>
      <span>:&nbsp;{AnAnswer}</span>
    </p>
  );
};

export default Answer;
