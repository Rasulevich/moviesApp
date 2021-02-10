import React from 'react';
import debounce from 'lodash.debounce';
import MovieList from './components/movieList/movieList';
import Search from './components/search/search';
import MovieService from './services/MovieService'
import { Provider } from './components/context/context';

export default class App extends React.Component {

  movieApi = new MovieService();

  state = {
    input: 'iron',
    rated:false
  }

  onSearch = debounce((text) => {
    this.setState({
      input: text
    })
  },300)

  rated = (boolean) => {
    this.setState({
      rated: boolean
    })
  }

  render() {
    const{input,rated} = this.state
    return (
        <Provider value={this.movieApi}>
          <div className="App">
            <Search onSearch={this.onSearch} rate={rated}/>
            <MovieList input={input} rated={this.rated}/>
          </div>
        </Provider>
    );
  }
}


