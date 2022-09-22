import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeCtn from '../../containers/HomeCtn';
import Error from '../Error/Error';
import Recipe from '../../containers/RecipeCtn';
import FormsCtn from '../../containers/FormsCtn';
import BasketCtn from '../../containers/BasketCtn';
import { Navigate } from 'react-router-dom';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeCtn />} />
      <Route path="/recipesApp" element={<Navigate to="/" replace />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/create" element={<FormsCtn />} />
      <Route path="/basket" element={<BasketCtn />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default React.memo(App);
