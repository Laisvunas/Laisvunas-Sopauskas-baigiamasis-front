import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';

function Notification(props) {
    const { variant, text } = props;
    const closeNotification = (e) => {
        e.target.parentNode.style.display = 'none';
    };
    return (
        <div className={`notification ${variant}`}>
            <button className="delete" onClick={closeNotification}></button>
            <div className="notification-body">
                {text}
            </div>
        </div>
    );
}

Notification.propTypes = {
    variant: PropTypes.string.isRequired,
    text: PropTypes.string,
};

Notification.defaultProps = {
    variant: undefined,
    text: undefined,
};

export default Notification;