import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Gallery: React.FC = () => {
  return (
      <div>
          <h1>Gallery</h1>
          <Link to="/"> Home </Link>
          <Link to="/test123"> test123 </Link>
      </div>
  );
  

};

export default Gallery;