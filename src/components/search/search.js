import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './search.css';
import MovieService from '../../services/MovieService';


export default class Search extends React.Component {

    static defaultProps = {
        onSearch: () => {},
        rate:false
    }

    static propTypes = {
        onSearch: PropTypes.func,
        rate: PropTypes.bool
    }

    searchMovie = new MovieService();

    state = {
        label: ' ' 
      }     
    
    onLabelChange = (event) => {
        const {onSearch} = this.props;
        onSearch(event.target.value)
        this.setState ( {
                label:event.target.value
        })
    }

    onSubmit = (event) => {
        const {onSearch} = this.props;
        const{label} = this.state;
        event.preventDefault()
        onSearch(label)
    }
    
    render() {
        const {rate} = this.props;
        const{label} = this.state;
        if (!rate) {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <Input className='searchInput' placeholder="Type to search..."
                            onChange = {this.onLabelChange}
                            value = {label} />
                    </form>
                </div>
            )
        }

        return (<div className='empty'/>)
        
    }
}
