import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert, Pagination } from 'antd';
import MovieService from '../../services/MovieService';
import './movieList.css';
import Movie from '../movie/movie';
import 'antd/dist/antd.css';
import '../spin.css';
import {GenreListConsumer} from '../context/context'

export default class MovieList extends React.Component{

    static defaultProps = {
        input:'',
        hideSearchInput:false
    }

    static propTypes = {
        input: PropTypes.string,
        hideSearchInput:PropTypes.func
    }

     movieApi = new MovieService();

    
     state = {
         items:[],
         loading: true,
         error:false,
         page:1,
         rated:false,
     }

     componentDidMount() {
        this.update()
     }

     componentDidUpdate(prevProps, prevState){
        const {input} = this.props;
        const {page,rated} = this.state;
        if (input !== prevProps.input) {
            this.update()
        }
        if (page !== prevState.page) {
            this.update()
        }
        if (rated !== prevState.rated) {
            this.update()
        }
     }

     onError = () => {
        this.setState({
            error:true,
            loading:false
        })
     }

     pageChange = (event) => {
        this.setState({
            page:event
        })
     }

     ratedMovies = () => {
        const {hideSearchInput} = this.props;
        hideSearchInput(true);
        this.setState({
            rated:true,
            page:1
        })
      }

      allMovies = () => {
        const {hideSearchInput} = this.props;
        hideSearchInput(false);
        this.setState({
            rated:false
        }) 
      }
     
     update() {
         const {input,guestSessionId} = this.props
         const {page, rated} = this.state

         if(!rated) {
            this.movieApi
            .getResource(input,page)
            .then((res) => {
               this.setState({
                    items:res.results,
                    loading:false,
                    error:false
                })
            })
            .catch(this.onError)
         }

         if(rated) {
             this.movieApi
             .ratedMovies(page,guestSessionId)
             .then((res) => {
                 this.setState({
                    items:res.results,
                    loading:false,
                 })
             })
         }         
     }

     render () {
        const {items, loading, error} = this.state;
        const {guestSessionId} = this.props
        const movie = (item, genresList) => (
                <span key={item.id}>
                                <Movie 
                                    title ={item.original_title} 
                                    date = {item.release_date}
                                    discription = {item.overview}
                                    image = {item.poster_path}
                                    rating={item.vote_average}
                                    id={item.id}
                                    userRating={item.rating}
                                    genresList={genresList}
                                    genres={item.genre_ids}
                                    guestSessionId={guestSessionId}/>   
                            </span>  
            )
        
        const elements = items.map(item => (
            <GenreListConsumer key={item.id}>
                {(genresList) => movie(item,genresList)}                  
            </GenreListConsumer>               
        ))       
        
        if (loading) {
            return (
              <div className="spin"><Spin/></div>
            )
        }

        if (error) {
            return (
                <Alert message="Something go wrong" type="success"/>
            )
        }

        return (
           <div>
                <button onClick={this.allMovies} type='button' className='tabs search_tab'> Search </button> <button type='button' className='tabs rate_tab' onClick={this.ratedMovies}>Rated </button>
                <ul className='movieList' >
                    {elements}
                </ul>
                <div className='pagination'>
                         <Pagination  defaultCurrent={1} total={50} 
                                      onChange={this.pageChange} />
                    </div>
           </div>       
        )
     }
}

