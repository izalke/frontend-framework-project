import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Test: FC = () => {
  return (
      <div>
          <h1>Test</h1>
          <Link to="/gallery"> gallery </Link>
          <Link to="/"> home </Link>
      </div>
  );
  

};

export default Test;