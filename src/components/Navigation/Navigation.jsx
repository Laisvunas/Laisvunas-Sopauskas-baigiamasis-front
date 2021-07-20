import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css';
import './Navigation.css';

function Navigation(props) {
    const { userName,  activeUrl } = props;

    const links = [
        {
            url: "/diagrams",
            label: "My Diagrams",
        },
        {
            url: "/generate",
            label: "Generate",
        },
        {
            url: "/publish",
            label: "Publish",
        },
    ];

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (

        
            <nav id="aside-nav">
            <div>
                <div className="compose has-text-centered">
                    Logged in as {userName}.  
                </div> 
                <div className="main">

                    {links.map(link => (<a key={link.url} className={`item ${link.url === activeUrl ? "active" : ""}`} href={link.url}><span className="icon"><i className="fa"></i></span><span className="name">{link.label}</span></a> ))}

                    <a href="#" className="item" onClick={logout}>
                        <span className="icon"><i className="fa"></i></span><span className="name">Logout</span>
                    </a>
                </div>
            </div>
            </nav>
        
        
    );
}







Navigation.propTypes = {
    activeUrl: PropTypes.string,
};

Navigation.defaultProps = {
    activeUrl: undefined,
};

export default Navigation;