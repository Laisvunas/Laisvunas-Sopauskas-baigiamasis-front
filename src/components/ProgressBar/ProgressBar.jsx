import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';

function ProgressBar(props) {
    const { size, variant, children, ...rest } = props;
    return (
        <progress className={`progress ${size} ${variant}`} {...rest}>
            {children}
        </progress>
    );
}

ProgressBar.propTypes = {
    variant: PropTypes.string.isRequired,
    size:  PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

ProgressBar.defaultProps = {
    variant: undefined,
    size: undefined,
    onClick: undefined,
};
  

export default ProgressBar;