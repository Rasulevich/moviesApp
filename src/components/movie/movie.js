/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import Genres from '../genres/genres'
import MovieService from '../../services/MovieService';
import  './movie.css';


export default class Movie extends React.Component  {

    static defaultProps = {
        id:'',
        discription:'',
        title:'',
        date:'',
        image:55440,
        rating:''
    }

    static propTypes = {
        id: PropTypes.number,
        discription: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        rating: PropTypes.number,
        image: PropTypes.string,
    }

    movieApi = new MovieService();

    state = {
        rate:'notRated',
        eclipses:''
    }    

    componentDidMount () {
        this.addEclipses()
    }


    postRate = (event) => {
        const{id,guestSessionId} = this.props
        this.movieApi.postRate(id,event,guestSessionId)
        localStorage.setItem(id, event);
        this.setState({
            rate:'rated'
        })
    }

    addEclipses = () => {
        const{discription} = this.props;
        if (discription.length > 150) {
            this.setState({
                eclipses:'...'
            })
        }
    }

    render() {
        const {title, date, discription, image,rating, id,genresList,genres} = this.props
        const newGenre = genres.map((el) => {
            let name
            for (const item of genresList) {
                if(item.id === el){
                     name = item.name
                }
            }
            return name
        })

        const {eclipses} = this.state;
        const localValue = localStorage.getItem(id);
        const gen = newGenre.slice(0,3)
        const genreElements = gen.map((item) => (
                <span key={Date.now() * Math.random()}>
                    <Genres genre={item}/>
                </span>
            ))
        let color
        if (rating > 7) {color = {border:'2px solid #66E900' };}
        if (rating > 5 && rating <= 7) {color = {border:'2px solid #E9D100' };}
        if (rating >= 3 && rating <= 5) {color = {border:'2px solid #E97E00' };}
        if (rating < 3) {color = {border:'2px solid #E90000' };}

        
        const src = `https://image.tmdb.org/t/p/w185/${image}`;
        const mobileSrc = `https://image.tmdb.org/t/p/w92/${image}`;
        const newText = discription.split(' ').splice(0,29).join(' ');

        return (
            <div className='movie'>
                <div className='movie-poster'>
                    <picture>
                            <source media="(max-width: 599px)" srcSet={mobileSrc}/>
                            <source media="(min-width: 600px)" srcSet={src}/>
                            <img  src={src} className='movie__img' alt='sorry, no poster' />
                    </picture>
                </div>
                <div className='movie-content'>
                    <header className='header'>                   
                         <h2 className='movie-content__title'>{title}</h2>
                         <div className='circle' style={color}>{rating}</div>
                    </header>
                    <h5 className='movie-content__date '>{date}</h5>
                    <div className='movie-content__genre'>  
                         {genreElements}
                    </div>
                    <span className='movie-content__discription'>{newText}{eclipses} </span>
                    <div className='rate'>
                      <Rate  allowClear value={localValue} defaultValue={0} onChange={this.postRate} count={9} />     
                    </div>
                </div>
            </div>        
        )
    }
}

