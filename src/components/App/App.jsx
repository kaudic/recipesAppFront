import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Recipe from '../../containers/RecipeCtn';
import Forms from '../Forms/Forms';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/create" element={<Forms />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

App.propTypes = {}

export default React.memo(App);
