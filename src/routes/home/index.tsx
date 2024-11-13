import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: FC = () => {
  return (
      <div>
          <h1>Home Component</h1>
          <Link to="/gallery"> gallery </Link>
          <Link to="/test123"> test123 </Link>
      </div>
  );
  

};

export default Home;