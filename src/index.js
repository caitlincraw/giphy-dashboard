import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gif from './Gif.js';
import Nav from './Nav.js';
import giphy from './api/giphy';
import GifSearchForm from './GifSearchForm';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {gifs: [],
                  isReady: false, 
                  title: "",
                  searchItems: []}
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit = (term, rating, searchLimit, response) => {
      this.setState({
        gifs: response.data.data,
        isReady: true,
        title: `${searchLimit} ${term} Gifs`,
        searchItems: [{term: term, rating: rating, searchLimit: searchLimit}]
      })
  }

  handleClick = () => {
    if ((Array.isArray(this.state.searchItems) && this.state.searchItems.length)) {
      let newSearchLimit = parseInt(this.state.searchItems[0].searchLimit)+5;
      let givenTerm = this.state.searchItems[0].term;
      let givenRating = this.state.searchItems[0].rating;
      if (givenRating === "all") {
        giphy.get(`/gifs/search?q=${encodeURIComponent(givenTerm)}&limit=${newSearchLimit}`)
        .then(response => {
            this.handleSubmit(givenTerm, givenRating, newSearchLimit, response)
        })
      } else {
        giphy.get(`/gifs/search?q=${encodeURIComponent(givenTerm)}&rating=${givenRating}&limit=${newSearchLimit}`)
        .then(response => {
          this.handleSubmit(givenTerm, givenRating, newSearchLimit, response)
        })
      }
    } else {
      alert("Please search for a specific keyword to see more gifs")
    }
  }

  componentDidMount(){
    giphy.get("/gifs/trending?limit=10")
    .then(response => {
      console.log(response);
      this.setState({gifs: response.data.data,
                    isReady: true,
                    title: "Top 10 Trending Gifs"})
    })
  }

  render() {
    if(this.state.isReady) {
      return (
        <div>
          <Nav handleClick={() => alert("You are trying to refresh the page")}/>
          <div className="searchCard">
            <GifSearchForm onSubmit={this.handleSubmit} /> 
          </div>
          <div className="titleBlock">
            <h1>{this.state.title}</h1>
          </div>
          <div className="container">
            {this.state.gifs.map(gif => <Gif key={gif.id} url={gif.images.original.url} title={gif.title} />)}
          </div>
          <div className="moreBtn">
            <button onClick={this.handleClick}>More GIFs</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Nav />
          <h1>Hold up, the Gifs are brewing....</h1>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

