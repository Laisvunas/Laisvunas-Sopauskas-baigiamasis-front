import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import * as S from "./Anchor.style";

function A(props) {
    const { children, ...rest } = props;

    return <S.A {...rest}>{children}</S.A>;

}

export default A;