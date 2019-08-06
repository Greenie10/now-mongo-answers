import React from "react";

class GardenersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
  }
  async componentDidMount() {
    const response = await fetch(
      "https://now-mongo-answers.lollymay.now.sh/list",
      {
        // const response = await fetch("http://localhost:3000/list", {
        // mode: "no-cors"
      }
    );
    const list = await response.json();
    this.setState({ list });
    console.log(response);
  }
  render() {
    return (
      <div>
        <h1>Gardeners</h1>

        <select id="select">
          <option value="">--Please choose--</option>
          {this.state.list &&
            this.state.list.gardeners.map(({ _id, name }) => (
              <option value={_id}>{name}</option>
            ))}
        </select>

        <label htmlFor="gardener-select">Choose a gardener:</label>

        <select id="gardener-select">
          <option value="">--Please choose--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
    );
  }
}

export default GardenersPage;
