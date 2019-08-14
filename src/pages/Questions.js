import React from "react";

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://now-mongo-answers.lollymay.now.sh/questionsList"
    );
    const list = await response.json();
    this.setState({ list });
    console.log(response);
  }
  render() {
    return (
      <div>
        <h1>Questions</h1>

        <table>
          <tr>
            <th>_id</th>
          </tr>
          {this.state.list &&
            this.state.list.questions.map(({ _id }) => (
              <tr>
                <td>{_id}</td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}

export default QuestionsPage;
