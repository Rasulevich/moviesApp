import React from 'react';
import  './movie.css';

const Movie = ({ title, date, genre, discription, image}) => (
            <div className='movie'>
                <div className='movie-poster'>
                <img  src={image} className='movie__img' alt='movie-img'/>
                </div>
                <div className='movie-content'>
                    <h2 className='movie-content__title'>{title}</h2>
                    <h5 className='movie-content__date '>{date}</h5>
                    <div className='movie-content__genre'>
                        <span className='movie-content__genre-item'>{genre}Action</span>
                        <span className='movie-content__genre-item'>Drama</span>
                    </div>
                    <span className='movie-content__discription'>{discription} </span>
                </div>
            
            </div>
        )

export default Movie