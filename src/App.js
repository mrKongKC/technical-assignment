import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import './css/App.css'
import Movie from './components/Movie';
import { fetchMovies } from './services/api'

function App() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const search = {
      release_year: new Date().getFullYear(),
      genres: '',
      search_query: '',
    }
    getMovies(search);
  }, []);

  const getMovies = (search) => {
    fetchMovies(search).then((res) => {
      setFilteredMovies(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleSearch = (search) => {
    getMovies(search);
  };

  return (
    <div className='main-container'>
      <Search handleSearch={handleSearch} />
      <div className='content-bg'>
        <div className='movie-container'>
          <Movie showMovies={filteredMovies} />
        </div>
      </div>
    </div>
  );
}

export default App;
