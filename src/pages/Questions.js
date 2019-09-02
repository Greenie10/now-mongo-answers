import React from "react";
import { Table } from "semantic-ui-react";

import Answer from "../Components/Answer";

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }
  async componentDidMount() {
    const response = await fetch("/questionsList");
    // this is where apollo client comes in somehow
    const list = await response.json();
    this.setState({ list });
  }

  render() {
    return (
      <div>
        <h1>Questions</h1>

        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Answers</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {this.state.list &&
            this.state.list.questions.map(
              ({ _id, Question, Location, Answers }) => {
                return (
                  <Table.Body key={_id}>
                    <Table.Row verticalAlign="top">
                      <Table.Cell>
                        {Question}
                        <br />
                        <em>{Location}</em>
                      </Table.Cell>
                      <Table.Cell>
                        {Answers.map((answer, index) => (
                          <Answer key={index} response={answer} />
                        ))}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              }
            )}
        </Table>
      </div>
    );
  }
}

export default QuestionsPage;
