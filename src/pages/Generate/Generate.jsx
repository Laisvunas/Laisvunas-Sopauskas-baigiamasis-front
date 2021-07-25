import React, { useEffect } from "react";
import { Container, Navigation, A } from "../../components";

const { siteName } = require('../../config');

const Generate = (props) => {
    
    useEffect(() => {
        document.title = `Generate | ${siteName}`;
    });

    return (
        
        <Container variant="wide">
            <div className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/generate" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 className="title is-2">Generate diagram</h2>
                    <p>Create diagram using the <A href="http://www.parsedclassics.com/tools/syntax_diagram_generator.html" target="_blank" rel="noopener noreferrer">Syntax Diagram Generator script</A>.</p>
                </div>
            </div>
        </Container>
    );

};

export default Generate;

