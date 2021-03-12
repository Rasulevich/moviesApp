/* eslint-disable no-param-reassign */
import ApiService from './ApiService';

export default class MovieService {

    apiService = new ApiService ();

    apiKey = 'a65d0b4dbc17f6ebd8b6206dd46dd8de';

    baseUrl = `https://api.themoviedb.org/3/`;

    async getResource (input,page) {
      if(input.length === 0) {input = 'iron'}
      return this.apiService.fetch(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${input}&page=${page}`)   
    }

    async guestSession () {
      return this.apiService.fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`)
    }

    async ratedMovies(page,guestSessionId) {
      return this.apiService.fetch(`${this.baseUrl}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`)
    }

    async postRate(id,valueRate,guestSessionId){
      const bodyData = { "value": `${valueRate}`}
      await fetch(`${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`, this.apiService.postData(bodyData));    
    }

    async getGenre() {
      return this.apiService.fetch(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US&language=en-US`)
    }

    async getImage(id) {
      return this.apiService.fetch(`${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}&language=en-US`)
    }
  }
 



  