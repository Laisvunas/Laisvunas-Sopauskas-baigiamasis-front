import React, { useContext, useState, useEffect } from "react";
import { Container, Navigation, Input, Textarea, Button, Notification } from "../../components";

const { backendUrlBase, siteName } = require('../../config');

const Publish = (props) => {
    const [title, setTitle] = useState();

    useEffect(() => {
        document.title = `Publish | ${siteName}`
    }, []);

    const publishDiagram = () => {

    };

    return (
        <Container variant="wide">
            <div className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/publish" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 className="title is-2">Publish Diagram</h2>
                    <Notification variant='is-success is-hidden' />
                    <Notification variant='is-danger is-hidden' />
                    <div id="publish-diagram">
                         <form
                            id="register_form"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                publishDiagram();
                            }}
                        >
                            <Input type="text" label="Title" placeholder="Title" minLength="5" onChange={(e) => setTitle(e.target.value)} />
                            <Textarea label="Sentence or Phrase" placeholder="Sentence or Phrase" rows={6} />
                            <Textarea label="Diagram Code" placeholder="Sentence or Phrase" rows={10} />
                            <Textarea label="Author's Commentary" placeholder="Author's Commentary" rows={6} />
                            <Textarea label="Editor's Commentary" placeholder="Editor's Commentary" rows={6} />
                            <Button variant='is-primary' type='submit'>Submit</Button>
                        </form>  
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Publish;