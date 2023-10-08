import React from 'react'

const Review = () => {
    return (
        <div>
            <main className="main-content">
                <div className="container">
                    <div className="page">
                        <div className="breadcrumbs">
                            <a href="index.html">Home</a>
                            <span>Movie Review</span>
                        </div>

                        <div className="filters">
                            <select name="#" id="#" placeholder="Choose Category">
                                <option value="#">Action</option>
                                <option value="#">Drama</option>
                                <option value="#">Fantasy</option>
                                <option value="#">Horror</option>
                                <option value="#">Adventure</option>
                            </select>
                            <select name="#" id="#">
                                <option value="#">2012</option>
                                <option value="#">2013</option>
                                <option value="#">2014</option>
                            </select>
                        </div>

                        <div className="movie-list">
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-3.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Maleficient</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-4.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">The adventure of Tintin</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-5.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Hobbit</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-6.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Exists</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-1.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Drive hard</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-2.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Robocop</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-7.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">Life of Pi</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                            <div className="movie">
                                <figure className="movie-poster"><img src="dummy/thumb-8.jpg" alt="#" /></figure>
                                <div className="movie-title"><a href="single.html">The Colony</a></div>
                                <p>Sed ut perspiciatis unde omnis iste natus error voluptatem doloremque.</p>
                            </div>
                        </div>

                        <div className="pagination">
                            <a href="#" className="page-number prev"><i className="fa fa-angle-left"></i></a>
                            <span className="page-number current">1</span>
                            <a href="#" className="page-number">2</a>
                            <a href="#" className="page-number">3</a>
                            <a href="#" className="page-number">4</a>
                            <a href="#" className="page-number">5</a>
                            <a href="#" className="page-number next"><i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Review