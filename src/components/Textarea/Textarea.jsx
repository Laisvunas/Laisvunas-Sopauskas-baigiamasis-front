import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import * as S from "./Textarea.style";

function Textarea(props) {
    const { rows, label, placeholder,  ...rest } = props;
    return (
        <div className="field">
            <div className="field-label is-normal">
                <S.Label className="label">{label}</S.Label>
            </div>
            <textarea className="textarea" placeholder={placeholder} rows={rows} {...rest} ></textarea>
        </div>
    );
}

Textarea.propTypes = {
    rows: PropTypes.number,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

Textarea.defaultProps = {
    rows: 6,
    label: undefined,
    placeholder: undefined,
    onChange: undefined,
};

export default Textarea;