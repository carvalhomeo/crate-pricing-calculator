import React from 'react';
import PropTypes from 'prop-types';

function Button({ type }) {
    // eslint-disable-next-line react/button-has-type
    return <button type={type}>Deploy</button>;
}

Button.propTypes = {
    type: PropTypes.oneOf([]).isRequired,
};

export default Button;
