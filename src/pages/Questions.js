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
              <Table.HeaderCell>_id</Table.HeaderCell>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Answers</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {this.state.list &&
            this.state.list.questions.map(
              ({ _id, Question, Location, Answers }) => {
                return (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{_id}</Table.Cell>
                      <Table.Cell>{Question}</Table.Cell>
                      <Table.Cell>{Location}</Table.Cell>
                      <Table.Cell>
                        {Answers.map(id => (
                          <Answer response={Answers[id]} />
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
