import { FC } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from './home';
import Gallery from './gallery';
import Test123 from './test123';

const Navigation: FC = () => {
    return (
        <Routes>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="test123" element={<Test123 />} />

        </Routes>



    );


};

export default Navigation;
