import { useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchfield, setSearchfield] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonster, setFilteredMonster] = useState(monsters);

  console.log("render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // if there is no dependency array (2nd argument), this will run only once when the component is mounted.

  useEffect(() => {
    const newFilteredMonster = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchfield);
    });
    setFilteredMonster(newFilteredMonster);
  }, [monsters, searchfield]);

  const onSearchChange = (event) => {
    const searchFiledString = event.target.value.toLowerCase();
    setSearchfield(searchFiledString);
  };

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
};

export default App;
