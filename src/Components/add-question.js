import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { zoneConstants } from "../constants";
import { StyledLabel, StyledInput, StyledSelect } from "./styled-components";

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
        <StyledLabel htmlFor="Question">Question posed</StyledLabel>
        <StyledInput
          name="Question"
          ref={node => {
            questionInput = node;
          }}
        />
        <StyledLabel htmlFor="Location">Location of broadcast</StyledLabel>
        <StyledInput
          name="Location"
          ref={node => {
            locationInput = node;
          }}
        />
        <StyledLabel htmlFor="Zone">Frost zone (USDA)</StyledLabel>
        <StyledSelect
          name="Zone"
          id="Zone"
          ref={node => {
            zoneInput = node;
          }}
        >
          <option value="">Select zone</option>
          {Object.keys(zoneConstants.ZONE).map((elem, _id) => {
            return (
              <option key={elem} value={elem}>
                {elem}
              </option>
            );
          })}
        </StyledSelect>
        <StyledLabel htmlFor="Date">Date of broadcast</StyledLabel>
        <StyledInput
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
