import React from "react";

class GardenersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://now-mongo-answers.lollymay.now.sh/list"
    );
    const list = await response.json();
    this.setState({ list });
    // console.log(response);
  }
  render() {
    return (
      <div>
        <h1>Gardeners</h1>

        <table>
          <tr>
            <th>Name</th>
            <th>_id</th>
          </tr>
          {this.state.list &&
            this.state.list.gardeners.map(({ _id, name }) => (
              <tr>
                <td>{name}</td>
                <td>{_id}</td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}

export default GardenersPage;
