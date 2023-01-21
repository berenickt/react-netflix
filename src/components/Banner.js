import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
  const [movie, setMovie] = useState([]); // ** 배너로 사용할 이미지 정보 가져오기
  const [isClicked, setIsClicked] = useState(false); // ** Play 버튼 클릭 시 비디오로 전환

  // ** 배너로 사용할 이미지 정보 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  // ** 배너로 사용할 이미지 정보 가져오기
  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  // ** 설명글 100자 이상이면 자른 후 ... 붙이기
  const truncate = (str, n) => {
    // 0 ~ n-1까지 자르기
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  console.log('movie', movie);

  // ** Play 버튼 클릭 시 비디오로 전환
  if (!isClicked) {
    return (
      // ** 배너로 사용할 이미지 정보 가져오기 UI
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>

          <div className="banner__buttons">
            {/* Play 버튼 클릭 시 비디오로 전환 */}
            <button className="banner__button play" onClick={() => setIsClicked(true)}>
              Play
            </button>
            <button className="banner__button info">More Information</button>
          </div>
          {/* 설명글 100자 이상이면 자른 후 ... 붙이기 */}
          <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return (
      // ** Play 버튼 클릭 시 비디오로 전환했을 떄 UI
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

// ** Iframe은 HTML Inline Frame 요소이며 inline frame의 약자
// iframe 요소를 이용하면 해당 웹 페이지 안에 어떠한 제한 없이 다른 페이지를 불러와서 삽입 가능
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// ** Play 버튼 클릭 시 비디오로 전환했을 떄 UI
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
