import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage() {
  // :style 문법을 path 경로에 사용하였다면 useParams()로 읽을 수 있음
  // ** 상세 페이지에서 영화 상세 정보 가져오기
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data); /// 응답받은 데이터를 넣어주기
    }
    fetchData();
  }, [movieId]); // movieId거 바뀌면 리렌더링

  if (!movie) return <div>...loading</div>;

  return (
    // ** 상세 페이지에서 영화 상세 정보 가져오기 UI
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
