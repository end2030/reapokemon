import React from 'react';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PokemonList />} />
          <Route path="/detail/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
