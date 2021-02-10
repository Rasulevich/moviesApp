export default class MovieService {

    apiKey = 'a65d0b4dbc17f6ebd8b6206dd46dd8de';

    sessionId = '5b8adc8622f0bb9b27d13b947a9be9e6'
    
    async auth() {
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`)
      if (!res.ok) {
        throw new Error(`Could not fetch ` + 
          `, received ${res.status}`)
      }
      const result = await res.json();
      return result
    }

    async getResource (input,page) {
      if(input.length === 0) {
        // eslint-disable-next-line no-param-reassign
        input = 'iron'
      }

      const res = await fetch
      (`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${input}&page=${page}`);
    
      if (!res.ok) {
        throw new Error(`Could not fetch ` + 
          `, received ${res.status}`)
      }

      const result = await res.json();
      return result;
    }

    async searchMovie(input ,page) {
      const res = await this.getResource(input,page);
      return res.results
    }

    async guestSession () {
      const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.apiKey}`)
      
      if (!res.ok) {
        throw new Error(`Could not fetch ` + 
          `, received ${res.status}`)
      }
      const result = await res.json();
      const sessionId = result.guest_session_id;
      return sessionId;
    }

    async ratedMovies(page) {
      const rate = await fetch(`https://api.themoviedb.org/3/guest_session/cfbb5f243cdc17e5cd4379069de4c6d6/rated/movies?api_key=a65d0b4dbc17f6ebd8b6206dd46dd8de&language=en-US&sort_by=created_at.asc&page=${page}`)
      const result = await rate.json()
      return result
    }

    async postRate(id,valueRate){
      await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=a65d0b4dbc17f6ebd8b6206dd46dd8de&guest_session_id=cfbb5f243cdc17e5cd4379069de4c6d6`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "value": `${valueRate}`})
      });
     
    }

    async getGenre(id) {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a65d0b4dbc17f6ebd8b6206dd46dd8de&language=en-US`)
      const result = await res.json();
      return result.genres;
    }

    async getImage(id) {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=a65d0b4dbc17f6ebd8b6206dd46dd8de&language=en-US`);
      const result = await res.json();
      return result
    }
  }
 



  