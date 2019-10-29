import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {
  QuestionWrapper,
  QuestionH4,
  AnswersList,
  Fleuron,
  ZoneBox
} from "./styled-components";
import { zoneConstants } from "../constants";

const GET_QUESTIONS = gql`
  query GetQuestions {
    getQuestions {
      id
      Question
      Location
      Zone
      Date
      Answers {
        Gardener
        AnAnswer
      }
    }
  }
`;

export function GetAllQuestions() {
  // const handleClick = id => {
  //   console.log("clicked!" + id);
  // };
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const { ZONE } = zoneConstants;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getQuestions.map(({ id, Question, Location, Zone, Answers }) => (
    <QuestionWrapper key={id}>
      <QuestionH4>
        <b>{Question}</b> - <em>{Location}</em>{" "}
        <ZoneBox zone={ZONE[Zone]}>{Zone}</ZoneBox>
      </QuestionH4>
      {/* <button onClick={() => handleClick(id)}>Add answer</button> */}
      <button>Add answer</button>
      <AnswersList>
        {Answers.map(({ Gardener, AnAnswer }, index) => (
          <span key={index}>
            <dt key={Gardener}>{Gardener}</dt>
            <dd key={index}>{AnAnswer}</dd>
          </span>
        ))}
      </AnswersList>
      <Fleuron>&#10086;</Fleuron>
    </QuestionWrapper>
  ));
}

export function ListUniqueLocations() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const unique = [...new Set(data.getQuestions.map(elem => elem.Location))];
  return unique.map((loc, index) => <p key={index}>{loc}</p>);
}
