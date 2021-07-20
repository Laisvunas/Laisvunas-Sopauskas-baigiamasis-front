import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import * as S from "./Input.style";

function Input(props) {
    const { type, label, placeholder, minlength, ...rest } = props;
    return (
        <div className="field">
            <div className="field-label is-normal">
                <S.Label className="label">{label}</S.Label>
            </div>
            <div className="field-body">
                <div className="field">
                    <p className="control">
                        <input className="input" type={type} minLength={minlength} placeholder={placeholder} {...rest} />
                    </p>
                </div>
            </div>
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    minlength: PropTypes.number,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    type: 'text',
    label: undefined,
    placeholder: undefined,
    minlength: undefined,
    onChange: undefined,
};

export default Input;