import React from 'react';
import { useState } from 'react';
import '../css/Movie.css'
import '../css/Modal.css'


const Modal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <div className='modal-img-container'>
                    <div className='img-container'>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="modal-img"
                        />
                    </div>
                </div>
                <div className='modal-content-detail'>
                    <h2>{movie.title}</h2>
                    <div className='modal-content-in-detail'>
                        <p><strong>Overview:</strong> {movie.overview}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

const Movie = ({ showMovies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };
    return (
        <>
            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={handleCloseModal} />
            )}
            {
                showMovies?.length > 0 ? (<div className='grid-container'>
                    {showMovies.map((movie) => (
                        <button key={movie.id} className='grid-item border-rotate' onClick={() => handleMovieClick(movie)}>
                            <div className='inner'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className='img-responsive'
                                />
                                <div className='card-detail'>
                                    <h3>{movie.title}</h3>
                                    <p className='mt-3'>Rating: {movie.vote_average}</p>
                                </div>
                            </div>

                        </button>
                    ))}
                </div>)
                    : (<div>
                        <div className='img-no-data-container'>
                            <img src='../no-data.png' alt="no-data" className='img-responsive-no-data' />
                        </div>
                        <h2 className='text-center white-color'> No data</h2>
                    </div>
                    )

            }

        </>

    );
};

export default Movie;