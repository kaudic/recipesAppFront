import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';
import Page from '../Page';
import Menu from '../Menu/Menu';

const Error = () => {
    return (
        <Page>
            <Menu />
            <div className="error">
                <img src={require(`../../assets/images/error404.jpg`)} alt={"image404"} />
                <p className="error-message">Veuillez vous rediriger à l'aide du Menu</p>
            </div>
        </Page>
    )
}

Error.propTypes = {};

export default React.memo(Error);