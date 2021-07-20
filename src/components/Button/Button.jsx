import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';

function Button(props) {
    const { variant, children, ...rest } = props;
    return (
        <button className={`button ${variant}`} {...rest}>
            {children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.string,
    title:  PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    variant: undefined,
    title: undefined,
    onClick: undefined,
};
  

export default Button;