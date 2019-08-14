import React from "react";

class GardenersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }
  async componentDidMount() {
    const response = await fetch("/list");
    const list = await response.json();
    this.setState({ list });
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
