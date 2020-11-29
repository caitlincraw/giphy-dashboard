import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gif from './Gif.js';
import Nav from './Nav.js';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {gifs: [],
                  isReady: false}
  }

  componentDidMount(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=suCTvQWQwFR0MH7hyapNQzpR7MS7Ur4T&limit=10")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({gifs: data.data,
                    isReady: true})
    })
  }

  render() {
    if(this.state.isReady) {
      return (
        <div>
          <Nav />
          <div className="container">
            {this.state.gifs.map(gif => <Gif key={gif.id} url={gif.images.original.url} title={gif.title} />)}
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

