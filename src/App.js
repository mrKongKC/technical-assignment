import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Movie from './components/Movie';
import Loading from './components/Loading'
import './css/App.css'
import { fetchMovies } from './services/api'

function App() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const search = {
      release_year: new Date().getFullYear(),
      genres: '',
      search_query: '',
    }
    getMovies(search);
  }, []);

  const getMovies = (search) => {
    setLoading(true)
    fetchMovies(search).then((res) => {
      setFilteredMovies(res)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 500)
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
          {loading && <Loading />}
          <Movie showMovies={filteredMovies} hasLoading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
