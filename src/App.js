import { Outlet, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';

// ** Outlet : Routes 자식 컴포넌트인 Route들이 전부 경로에 맞게 렌더링
// 자식 경로 요소를 렌더링하려면 부모 경로 요소에서 <Outlet>을 사용
// 하위 경로가 렌더링될 때 중첩된 UI가 표시
// 부모 라우트가 정확히 일치하면 자식 인덱스 라우트를 렌더링하거나
// 인덱스 라우트가 없으면 아무것도 렌더링하지 않습니다
const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

// ** Routes : 앱에서 생성될 모든 개별 경로에 대한 컨테이너/상위 역할
// Route로 생성된 자식 컴포넌트 중 매칭되는 첫 번쟤 Route를 렌더링해줌
// ** Route :  단일 경로를 만드는데 사용, 2가지 속성을 취함
// - path는 원하는 컴포넌트 URL 경로를 지정, 경로 이름은 마음대로
// - element 경로에 맞게 렌더링되어야 하는 컴포넌트를 지정

export default function App() {
  return (
    <div className="app">
      <Routes>
        {/* App 컴포넌트에 Header Footuer 등 Layout */}
        <Route path="/" element={<Layout />}>
          {/* localhost:3000/ 경로 => MainPage */}
          <Route index element={<MainPage />} />
          {/* localhost:3000/13 경로 => DetailPage */}
          <Route path=":movieId" element={<DetailPage />} />
          {/* localhost:3000/search 경로 => SearchPage */}
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}
