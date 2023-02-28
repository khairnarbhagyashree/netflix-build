import React from 'react';
import Banner from '../Banner';
import "./HomeScreen.css"
import Nav from '../Nav';
import requests from '../Requests';
import Row from '../Row';


function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                fetchURL={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending Now" fetchURL={requests.fetchTrending} />
            <Row title="Top rated" fetchURL={requests.fetchTopRated} />
            <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchURL={requests.fetchHorroMovies} />
            <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
            <Row title="Documentries" fetchURL={requests.fetchTrending} />
        </div>

    );
}

export default HomeScreen;