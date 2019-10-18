import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { zoneConstants } from "../constants";
import {
  QuestionLabel,
  QuestionInput,
  QuestionSelect
} from "./styled-components";

const ADD_QUESTION = gql`
  mutation AddQuestion(
    $Question: String!
    $Location: String!
    $Zone: String!
    $Date: String!
  ) {
    addQuestion(
      Question: $Question
      Location: $Location
      Zone: $Zone
      Date: $Date
    ) {
      id
      Question
      Location
      Zone
      Date
    }
  }
`;

export function AddQuestion() {
  const [addQuestion] = useMutation(ADD_QUESTION);
  let questionInput, locationInput, zoneInput, dateInput;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addQuestion({
            variables: {
              Question: questionInput.value,
              Location: locationInput.value,
              Zone: zoneInput.value,
              Date: dateInput.value
            }
          });
          questionInput.value = "";
          locationInput.value = "";
          zoneInput.value = "";
          dateInput.value = "";
        }}
      >
        <QuestionLabel htmlFor="Question">Question posed</QuestionLabel>
        <QuestionInput
          name="Question"
          ref={node => {
            questionInput = node;
          }}
        />
        <QuestionLabel htmlFor="Location">Location of broadcast</QuestionLabel>
        <QuestionInput
          name="Location"
          ref={node => {
            locationInput = node;
          }}
        />
        <QuestionLabel htmlFor="Zone">Frost zone (USDA)</QuestionLabel>
        <QuestionSelect
          name="Zone"
          id="Zone"
          ref={node => {
            zoneInput = node;
          }}
        >
          <option value="">Select zone</option>
          {Object.keys(zoneConstants.ZONE).map((elem, _id) => {
            return <option value={elem}>{elem}</option>;
          })}
        </QuestionSelect>
        <QuestionLabel htmlFor="Date">Date of broadcast</QuestionLabel>
        <QuestionInput
          name="Date"
          ref={node => {
            dateInput = node;
          }}
        />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}
