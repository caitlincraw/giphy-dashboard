import React from 'react';
import './index.css';
import giphy from './api/giphy';

class GifSearchForm extends React.Component {
    state = {
        term: "",
        rating: "all",
        searchLimit: 5
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.state.term = (this.state.term === "") ? `You didn't enter a keyword` : this.state.term;

        if (this.state.rating === "all") {
            giphy.get(`/gifs/search?q=${encodeURIComponent(this.state.term)}&limit=${this.state.searchLimit}`)
            .then(response => {
                this.props.onSubmit(this.state.term, this.state.rating, this.state.searchLimit, response)
            })
        } else {
            giphy.get(`/gifs/search?q=${encodeURIComponent(this.state.term)}&rating=${this.state.rating}&limit=${this.state.searchLimit}`)
            .then(response => {
            this.props.onSubmit(this.state.term, this.state.rating, this.state.searchLimit, response)
            })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <label htmlFor="term">Search by Keyword</label>
                <input type="text" id="term" name="term" onChange={this.handleChange} />
                <label htmlFor="rating">Select a Rating</label>
                <select id="rating" name="rating" onChange={this.handleChange}>
                    <option value="all">Any Rating</option>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg-13">PG-13</option>
                    <option value="r">R</option>
                </select>
                <div className="form-check form-check-inline">
                    <label> Pick the Response Limit:
                        <input className="form-check-input" type="radio" name="searchLimit" id="5" value="5" onChange={this.handleChange}/>
                        <label htmlFor="5" className="form-check-label">5</label>
                        <input className="form-check-input" type="radio" name="searchLimit" id="10" value="10" onChange={this.handleChange}/>
                        <label htmlFor="10" className="form-check-label">10</label>
                        <input className="form-check-input" type="radio" name="searchLimit" id="15" value="15" onChange={this.handleChange}/>
                        <label htmlFor="15" className="form-check-label">15</label>
                        <input className="form-check-input" type="radio" name="searchLimit" id="20" value="20" onChange={this.handleChange}/>
                        <label htmlFor="20" className="form-check-label">20</label>
                    </label>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default GifSearchForm;