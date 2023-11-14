import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './components/Button';

const getData = async (callback) => {
  return await axios.get('/api/data').then((res) => callback(res.data));
};

const App = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    getData((res) => setData(res));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      <Button>Click Me</Button>
    </div>
  );
};

export default App;
