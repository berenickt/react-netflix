import React from 'react';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';

export default function MainPage() {
  // isLargeRow : 오리지널 시리즈는 크게하기 위해 구분을 위해서
  return (
    <div>
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" id="Cm" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}
