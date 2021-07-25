import React from "react";
import { Container, Navigation, Notification } from "../../components";

const { siteName } = require('../../config');

const NotFound = () => {

    return (
        <Container variant="wide">
            <div id="view" className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/publish"></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 id="page-title" className="title is-2">Page not found</h2>
                    <Notification variant='is-danger' text="Page not found. Probable causes: wrong URL address or content removed by author or editor." />
                </div>
            </div>
        </Container>
    );

}

export default NotFound;