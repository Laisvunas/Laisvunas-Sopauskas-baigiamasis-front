import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import * as S from "./Anchor.style";

function A(props) {
    const { href, target, children, ...rest } = props;

    return <S.A href={href} target={target} {...rest}>{children}</S.A>;

}

A.propTypes = {
    href: PropTypes.string.isRequired,
    target:  PropTypes.string,
};

A.defaultProps = {
    href: undefined,
    target: undefined,
};

export default A;