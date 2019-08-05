import React from "react";

class GardenersPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Gardeners</h1>

        <label for="gardener-select">Choose a gardener:</label>

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
