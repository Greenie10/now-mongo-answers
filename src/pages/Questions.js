import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const QUESTIONS = gql`
  query TestQuery {
    getQuestions {
      Location
    }
  }
`;

export function Questions() {
  const { loading, error, data } = useQuery(QUESTIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getQuestions.map(({ id, Location }) => (
    <p key={id}>{Location}</p>
    )
  )
}

export const QuestionsPage = () => {
    return (
      <div>
        <h1>Questions</h1>
        <Questions />
        
      </div>
    );
  }

export default QuestionsPage;
