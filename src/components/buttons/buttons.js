import React from 'react';
import './buttons.css'

const Buttons = ({ratedMovies}) => (
        <div>
            <span className='tabs search_tab'> Search </span> <button type='button' className='tabs rate_tab' onClick={ratedMovies}>Rated </button>
        </div>
    )

export default Buttons