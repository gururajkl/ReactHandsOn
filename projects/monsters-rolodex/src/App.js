import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  // 1st this method will run.
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFiled: "",
    };
  }

  // Life cycle method in react when compenent is mounted (loads).
  // 3rd this method will run.
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchFiled = event.target.value.toLowerCase();
    this.setState({ searchFiled: searchFiled });
  };

  // 2nd this method will run.
  render() {
    const { monsters, searchFiled } = this.state;
    const { onSearchChange } = this;

    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchFiled);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="monster-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonster} />
      </div>
    );
  }
}

export default App;
