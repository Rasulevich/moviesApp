import React from 'react';
import { Rate } from 'antd';
import Genres from '../genres/genres'
import MovieService from '../../services/MovieService';
import  './movie.css';


export default class Movie extends React.Component  {

    movieApi = new MovieService();

    state = {
        genres:[]
    }    

    componentDidMount () {
        this.updateGenre()
    }

    updateGenre = () => {
        const {getGenre, id} = this.props;
            getGenre(id)
            .then((res) => {
                this.setState({
                    genres:res
                })
            })
    }

    postRate = (event) => {
        const{id} = this.props
        this.movieApi.postRate(id,event)
        localStorage.setItem(id, event);
    }

    render() {
        const {title, date, discription, image,rating, id} = this.props
        const {genres} = this.state

        const localValue = localStorage.getItem(id);
        const gen = genres.slice(0,3)
        const genreElements = gen.map((item) => (
                <span key={item.id}>
                    <Genres genre={item.name}/>
                </span>
            ))
        let color
        if (rating > 7) {color = {border:'2px solid #66E900' };}
        if (rating > 5 && rating <= 7) {color = {border:'2px solid #E9D100' };}
        if (rating >= 3 && rating <= 5) {color = {border:'2px solid #E97E00' };}
        if (rating < 3) {color = {border:'2px solid #E90000' };}
  
        const src = `https://image.tmdb.org/t/p/w185/${image}`;
        const mobileSrc = `https://image.tmdb.org/t/p/w92/${image}`;
        const newText = discription.slice(0, 240) ;

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
                    <span className='movie-content__discription'>{newText} </span>
                    <div className='rate'>
                      <Rate  allowClear value={localValue} defaultValue={0} onChange={this.postRate} count={9} />     
                    </div>
                </div>
            </div>        
        )
    }
}

