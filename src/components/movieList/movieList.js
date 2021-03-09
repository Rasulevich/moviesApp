import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert, Pagination } from 'antd';
import MovieService from '../../services/MovieService';
import './movieList.css';
import Movie from '../movie/movie';
import 'antd/dist/antd.css';
import '../spin.css';
import {Consumer} from '../context/context'

export default class MovieList extends React.Component{

    static defaultProps = {
        input:'',
        rated:false
    }

    static propTypes = {
        input: PropTypes.string,
        rated:PropTypes.bool
    }

     movieApi = new MovieService();

     state = {
         items:[],
         loading: true,
         error:false,
         page:1,
         rated:false
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
        const {rated} = this.props;
        this.setState({
            rated:true
        })
        rated(true)
      }

      allMovies = () => {
        const {rated} = this.props;
        this.setState({
            rated:false
        })
        rated(false)
      }
     
     update() {
         const {input} = this.props
         const {page, rated} = this.state

         if(!rated) {
            this.movieApi
            .searchMovie(input,page)
            .then((res) => {
               this.setState({
                    items:res,
                    loading:false,
                    error:false
                })
            })
            .catch(this.onError)
         }

         if(rated) {
             this.movieApi
             .ratedMovies(page)
             .then((res) => {
                 this.setState({
                    items:res.results,
                    loading:false
                 })
             })
         }         
     }

     render () {
        const {items, loading, error, currentPage} = this.state;
        const elements = items.map(item => (
                <Consumer key={item.id}>
                    {
                        ({getGenre}) => (
                                <span key={item.id}>
                                    <Movie 
                                        title ={item.original_title} 
                                        date = {item.release_date}
                                        discription = {item.overview}
                                        image = {item.poster_path}
                                        rating={item.vote_average}
                                        id={item.id}
                                        userRating={item.rating}
                                        getGenre={getGenre}/>   
                                </span>                                 
                            )
                    }                  
                </Consumer>               
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
                    <div className='pagination'>
                         <Pagination  defaultCurrent={currentPage} total={50} 
                                      onChange={this.pageChange}/>
                    </div>
                </ul>
           </div>       
        )
     }
}

