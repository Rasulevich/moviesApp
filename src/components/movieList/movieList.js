import React from 'react';
import { Spin, Alert } from 'antd';
import MovieService from '../../services/MovieService';
import './movieList.css';
import Movie from '../movie/movie';
import 'antd/dist/antd.css';
import '../spin.css';

export default class MovieList extends React.Component{
     movieApi = new MovieService();

     state = {
         items:[],
         loading: true,
         error:false
     }

     constructor() {
         super()
         this.update()
     }

     onError = () => {
        this.setState({
            error:true,
            loading:false
        })
     }

     update() {
         this.movieApi
           .searchMovie()
           .then((res) => {
               this.setState({
                    items:res,
                    loading:false
                })
            })
            .catch(this.onError)
     }


     render () {
        const {items, loading, error} = this.state;
        const elements = items.map(item => (
                <Movie 
                   title ={item.original_title} 
                   date = {item.release_date}
                   discription = {item.overview}
                   image = {item.backdrop_path}/>
            ))
        if (loading) {
            return (
              <div className="spin"><Spin /></div>
            )
        }
        if (error) {
            return (
                <Alert message="Something go wrong" type="success" />
            )
        }
        return (
          <ul className='movieList' >
             <span className='movieItem'>
               {elements}
             </span> 
          </ul>
        )
     }
}

