import axios from 'axios';
const API_KEY = 'e6e8635222fd462eaa37ed7bc9713a05'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return response.data.genres
};

export const fetchMovies = async (data = {}) => {    
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    if (data.release_year) {
        url += `&primary_release_year=${data.release_year}`;
    }

    if (data.genres) {
        url += `&with_genres=${data.genres}`;
    }

    const response = await axios.get(url)
    const results = response.data.results;

    const filteredResults = results.filter((item) =>
        item.title.toLowerCase().includes(data.search_query.toLowerCase())
    );    

    return filteredResults
};
