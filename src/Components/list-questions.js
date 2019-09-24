import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

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

export function ListAllQuestions() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getQuestions.map(({ id, Question, Location, Zone, Date, Answers }) => (
    <div key={id}>
    <p>{Location} {Zone} - <b>{Question}</b> {Date}<br />
    
    {Answers.map(({Gardener, AnAnswer }) => (
      <span key={Gardener}><b>{Gardener}</b>: {AnAnswer}</span>
    ))},
    </p>
    </div>
    )
  )
};

export function ListUniqueLocations() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const unique =  [...new Set(data.getQuestions.map(elem => elem.Location))];
  return unique.map((loc, index) => (
    <p key={index}>{loc}</p>
  ))
}

