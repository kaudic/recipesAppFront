import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../containers/Cards';
import Menu from '../Menu/Menu';
import Page from '../Page';

const Home = () => {
    return (
        <Page>
            <Menu />
            <Cards />
        </Page>
    )
}

Home.propTypes = {};

export default React.memo(Home);