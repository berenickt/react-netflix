import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MovieModal from './MovieModal';
import './Row.css';

// ** swiper 모듈을 이용한 터치 슬라이드 구현
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// ** Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]); // ** 영화 정보 가져오기
  const [modalOpen, setModalOpen] = useState(false); // ** 영화 클릭 시 모달 Open
  const [movieSelected, setMovieSelected] = useState({}); // ** 클릭한 영화 정보 Get

  // ** 영화 정보 가져오기
  useEffect(() => {
    fetchMovieData();
  }, []);

  // ** 영화 정보 가져오기
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log('request', request);
    setMovies(request.data.results);
  };

  // ** 영화 클릭 시 모달 Open & 클릭한 영화 정보 Get
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* swiper 모듈을 이용한 터치 슬라이드 구현 */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              {/* 영화 클릭 시 모달 Open */}
              <img
                key={movie.id}
                style={{ padding: '25px 0' }}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {/* 영화 클릭 시 모달 Open & 클릭한 영화 정보 Get */}
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}

// **** eslint-disable-next-line no-lone-blocks
// {
//   <section className="row">
//     <h2>{title}</h2>
//     <div className="slider">
//       <div className="slider__arrow-left">
//         <span
//           className="arrow"
//           // 화살표 방향 클릭 시 스크롤 왼쪽으로 이동
//           onClick={() => {
//             document.getElementById(id).scrollLeft -= window.innerWidth - 80;
//           }}
//         >
//           {'<'}
//         </span>
//       </div>
//       <div id={id} className="row__posters">
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
//             src={`https://image.tmdb.org/t/p/original/${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             } `}
//             alt={movie.name}
//             onClick={() => handleClick(movie)}
//           />
//         ))}
//       </div>
//       <div className="slider__arrow-right">
//         <span
//           className="arrow"
//           // 화살표 방향 클릭 시 스크롤 오른쪽으로 이동
//           onClick={() => {
//             document.getElementById(id).scrollLeft += window.innerWidth - 80;
//           }}
//         >
//           {'>'}
//         </span>
//       </div>
//     </div>

//     {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
//   </section>;
// }
