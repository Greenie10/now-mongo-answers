import React from "react";

const Answer = ({ response: { Gardener, AnAnswer } }) => {
  return (
    <p>
      <strong>{Gardener}</strong>
      <span>:&nbsp;{AnAnswer}</span>
    </p>
  );
};

export default Answer;
