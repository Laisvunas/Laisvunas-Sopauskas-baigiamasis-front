import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import * as S from "./Container.style";

function Container(props) {
    const { variant, children } = props;

    if (variant === "wide") {
        return (
            <S.WideDiv>{children}</S.WideDiv>
        );
    }
    else if (variant === "padded") {
        return (
            <S.PaddedDiv>{children}</S.PaddedDiv>
        );
    }
    else if (variant === "text") {
        return (
            <S.TextDiv>{children}</S.TextDiv>
        );
    }

    return (
        <S.Div>{children}</S.Div>
    );
};

Container.propTypes = {
    onClick: PropTypes.func,
};

Container.defaultProps = {
    onClick: undefined,
};

export default Container;