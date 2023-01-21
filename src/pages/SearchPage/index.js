import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css';

export default function SearchPage() {
  const navigate = useNavigate(); // 포스터 클릭 시 상세 페이지로
  const [searchResults, setSearchResults] = useState([]);

  // ** useLocation : 현재 위치 객체를 반환
  // 현재 위치가 변경될 때마다 일부 side effect를 수행하려는 경우에 유용
  const useQuery = () => {
    return new URLSearchParams(useLocation().search); // Search 페이지에서 SearchTerm 갖고오기
  };

  let query = useQuery();
  const searchTerm = query.get('q'); // 검색한 SearchTerm 갖고있음
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5초시간 후에 debounced

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    console.log('검색한것', searchTerm);
    try {
      // 검색한 SearchTerm로 GET 요청
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  // ** SearchTerm에 있는지 없는지에 따라 보여줄 UI
  const renderSearchResults = () => {
    // SearchTerm에 해당 영화 데이터가 있을 경우
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                {/* 포스터 클릭 시 상세 페이지로 */}
                <div onClick={() => navigate(`/${movie.id}`)} className="movie__column-poster">
                  <img src={movieImageUrl} alt="movie" className="movie__poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      // SearchTerm에 해당 영화 데이터가 없을 경우
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
