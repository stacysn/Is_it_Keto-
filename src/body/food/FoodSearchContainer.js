import React, { Component } from "react";
import "../../assets/styles/FoodSearchContainer.css";
import FoodResults from "./FoodResults";

class FoodSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let foodSearchQuery = document.getElementById("foodSearchInput").value;
    const key = "381d57068dd3a75a7f6dc82f3b275f65";
    const appId = "2e1bc7f0";

    fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
      method: "post",
      headers: {
        "x-app-key": `${key}`,
        "x-app-id": `${appId}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: foodSearchQuery
      })
    }).then(response => {
      if (response.status !== 200) {
        console.log("Error: " + response.status);
        return;
      }
      // TODO: .fail this console log

      response.json().then(data => {
        const results = data.foods;
        this.setState({ results });
        console.log("new state: ", this.state.results);
      });
    });
  }

  render() {
    return (
      <div className="food-search-container">
        <h1>FoodSearchContainer</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            id="foodSearchInput"
            placeholder="Example: For breakfast I had 2 large eggs, 3 pieces of bacon, and 1 medium avocado"
            type="text"
            required
          />

          <input type="submit" value="Submit" />
          <br />
          <FoodResults results={this.state.results} />
        </form>
      </div>
    );
  }
}

export default FoodSearchContainer;