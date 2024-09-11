import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../services/api';
import '../css/Search.css';

const Search = ({ handleSearch }) => {
    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());

    const onClickSearch = () => {
        const data = {
            release_year: releaseYear,
            genres: selectedGenre,
            search_query: search,

        }
        handleSearch(data);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value); 
    };

    const getGenres = () => {
        fetchGenres().then((res) => {
            setGenres(res);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <div className='search-container'>
            <div className='search-container-content'>
                <h3 className='main-logo'>Movie TMDB</h3>
                <div className='search-bar'>
                    <div className='serach-content-box'>
                        <div className='input-container'>
                            <input onChange={(e) => setSearch(e.target.value)} placeholder='Search..' className='input' />
                            {
                                search?.length === 0 &&
                                <img src='../img/search-icon.svg' alt='search-icon' width={15} className='search-icon' />
                            }
                        </div>
                    </div>
                    <div className='input-container'>
                        <input onChange={(e) => setReleaseYear(e.target.value)} placeholder='YYYY' className='input' type='number' defaultValue={releaseYear}/>
                    </div>
                    <select
                        className="minimal"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="">All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <button className='primary-gradient-btn btn h-43' onClick={onClickSearch}>Explore</button>
                </div>
            </div>
        </div>
    );
};

export default Search;
