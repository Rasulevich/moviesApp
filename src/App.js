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
    hideSearch:false,
    genresList:[],
    guestSessionId:''
  }

  componentDidMount() {
    this.genresList()
    this.movieApi.guestSession().then((res)=>{
      this.setState({
        guestSessionId:res.guest_session_id
      })
    })
    localStorage.clear();
  }

  onSearch = debounce((text) => {
    this.setState({
      input: text
    })
  },300)

  hideSearchInput = (boolean) => {
    this.setState({
      hideSearch: boolean
    })
  }

  genresList() {
    this.movieApi.getGenre()
                    .then((res) =>{
                      this.setState({
                        genresList:res.genres
                      })
                    })
  } 

  render() {
    const{input,hideSearch,genresList, guestSessionId} = this.state;
    return (
        <Provider value={genresList}>
          <div className="App">
            <Search onSearch={this.onSearch} hideSearch={hideSearch}/>
            <MovieList input={input} hideSearchInput={this.hideSearchInput} guestSessionId={guestSessionId}/>
          </div>
        </Provider>
    );
  }
}


