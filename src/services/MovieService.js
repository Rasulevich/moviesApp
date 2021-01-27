export default class MovieService {

    async getResource (url) {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a65d0b4dbc17f6ebd8b6206dd46dd8de&query=return`);
    
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` + 
          `, received ${res.status}`)
      }
      const result = await res.json();
      return result;
    }

    async searchMovie() {
      const res = await this.getResource();
      return res.results
    }
  }
 
  