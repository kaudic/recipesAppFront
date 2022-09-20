import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Recipe from '../../containers/RecipeCtn';
import Forms from '../Forms/Forms';
import Basket from '../Basket/Basket';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/create" element={<Forms />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default React.memo(App);
