import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: FC = () => {
  return (
      <div>
          <h1>Home Component</h1>
          <Link to="/gallery"> gallery </Link>
          <Link to="/test123"> test123 </Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/cars">CarList</Link>
      </div>
  );
  

};

export default Home;