import React from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { StyledLabel, StyledInput } from "./styled-components";

const INSERT_ANSWER = gql`
  mutation InsertAnswer($id: ID!, $Answers: InputAnswer) {
    insertAnswer(id: $id, Answers: $Answers) {
      Answers {
        AnAnswer
        Gardener
      }
    }
  }
`;

export function InsertAnswer() {
  const [insertAnswer] = useMutation(INSERT_ANSWER);
  let anAnswerInput, gardenerInput;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        insertAnswer({
          variables: {
            Answers: [
              {
                Gardener: gardenerInput.value,
                AnAnswer: anAnswerInput.value
              }
            ]
          }
        });
        anAnswerInput.value = "";
        gardenerInput.value = "";
      }}
    >
      <StyledLabel htmlFor="AnAnswer">Answer</StyledLabel>
      <StyledInput
        name="AnAnswer"
        ref={node => {
          anAnswerInput = node;
        }}
      />
      <StyledLabel htmlFor="Gardener">Gardener</StyledLabel>
      <StyledInput
        name="Gardener"
        ref={node => {
          gardenerInput = node;
        }}
      />
      <button type="submit">Add Answer</button>
    </form>
  );
}
