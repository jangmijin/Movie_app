import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  //Render: componentWillMount() -> render() -> componentDidMount()
  //Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}

  componentDidMount(){
    this._getMovies();
    /*
    setTimeout(() => {
      this.setState({
        movies: [
          ...this.state.movies,//이 뜻은 이전 영화 리스트를 그대로 두고 그리고 한개 영화를 추가
        ]
        
        movies: [
          {
            title:"Matrix",
            poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Ultimate_Matrix_Collection_poster.jpg/220px-Ultimate_Matrix_Collection_poster.jpg"
          },
          {
            title:"Full Metal jacket",
            poster:"https://upload.wikimedia.org/wikipedia/en/9/99/Full_Metal_Jacket_poster.jpg"
          },
          {
            title:"Oldboy",
            poster:"https://upload.wikimedia.org/wikipedia/en/b/bb/Oldboy_2013_film_poster.jpg"
          },
          {
            title:"Star Wars",
            poster:"https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711"
          },
          {
            title:"trainspotting",
            poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Ultimate_Matrix_Collection_poster.jpg/220px-Ultimate_Matrix_Collection_poster.jpg"
          }
        ]

      })
    },3000)
    */
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
      title={movie.title_english} 
      poster={movie.medium_cover_image} 
      key={movie.id} 
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies =  async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
     return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies () : 'Loading'}
      </div>
    );
  }
}

export default App;
