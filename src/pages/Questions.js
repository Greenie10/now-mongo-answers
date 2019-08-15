import React from "react";

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

        <table>
          <tr>
            <th>_id</th>
            <th>Question</th>
            <th>Answers</th>
          </tr>
          {this.state.list &&
            this.state.list.questions.map(({ _id, Question, Location }) => (
              <tr>
                <td>{_id}</td>
                <td>{Question}</td>
                <td>{Location}</td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}

export default QuestionsPage;
