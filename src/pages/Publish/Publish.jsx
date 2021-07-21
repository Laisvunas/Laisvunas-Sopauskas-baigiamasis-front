import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Navigation, Input, Textarea, Button, Notification } from "../../components";

const { backendUrlBase, siteName } = require('../../config');

const Publish = (props) => {
    const [diagramId, setId] = useState();
    const [title, setTitle] = useState();
    const [sentence, setSentence] = useState();
    const [code, setCode] = useState();
    const [commentary, setCommentary] = useState();
    const [editorCommentary, setEditorCommentary] = useState();

    const { id } = useParams();

    useEffect(() => {
        document.title = `Publish | ${siteName}`;
        
        if (typeof id !== 'undefined') {
            setId(id);
            console.log("1 id: " + id);
        }
           
    }, []);

    console.log("props.auth: " + JSON.stringify(props.auth));

    const publishDiagram = () => {
        const url = `${backendUrlBase}/diagrams/publish`;
        const token = localStorage.getItem("token");

        console.log("props: " + JSON.stringify(props));
        console.log("2 id: " + id);

        try {
            fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: diagramId,
                    author_id: props.auth.author_id,
                    title: title,
                    sentence: sentence,
                    code: code,
                    commentary: commentary,
                    editors_commentary: editorCommentary,
                    editor: props.auth.isEditor,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                if (typeof data.msg !== 'undefined') {
                    document.querySelector('.notification.is-success > div.notification-body').innerText = data.msg;
                    document.querySelector('.notification.is-success').classList.remove('is-hidden');
                    document.querySelector('.notification.is-success').style.display = 'block';
                    if (typeof data.data !== 'undefined' && typeof data.data.insertId !== 'undefined' && data.data.insertId !== 0) {
                        setId(data.data.insertId);
                        window.history.replaceState(null, null, `/publish/${data.data.insertId}`);
                        document.title = `Edit | ${siteName}`;
                        document.querySelector("#page-title").innerText = "Edit Diagram";
                    }
                }
                else if (typeof data.error !== 'undefined') {
                    // console.log(data.error);
                    document.querySelector('.notification.is-danger > div.notification-body').innerText = 'Some error happened. Try again later.';
                    document.querySelector('.notification.is-danger').classList.remove('is-hidden');
                    document.querySelector('.notification.is-danger').style.display = 'block';
                }

            });
        }
        catch (e) {
            document.querySelector('.notification.is-danger > div.notification-body').innerText = 'Some error happened. Try again later.';
            document.querySelector('.notification.is-danger').classList.remove('is-hidden');
            document.querySelector('.notification.is-danger').style.display = 'block';
        }
    };

    return (
        <Container variant="wide">
            <div className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/publish" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 id="page-title" className="title is-2">Publish Diagram</h2>
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
                            <Input type="text" label="Title" placeholder="Title" minLength="5" required="required" onChange={(e) => setTitle(e.target.value)} />
                            <Textarea label="Sentence or Phrase" placeholder="Sentence or Phrase" required="required" rows={6} onChange={(e) => setSentence(e.target.value)} />
                            <Textarea label="Diagram Code" placeholder="Diagram Code" rows={10} required="required" onChange={(e) => setCode(e.target.value)} />
                            <Textarea label="Author's Commentary" placeholder="Author's Commentary" rows={6} onChange={(e) => setCommentary(e.target.value)} />

                            {(props.auth.isEditor === 'y') ? <Textarea label="Editor's Commentary" placeholder="Editor's Commentary" rows={6} rows={6} onChange={(e) => setEditorCommentary(e.target.value)} /> : ''}
                            
                            <Button variant='is-primary' type='submit'>Submit</Button>
                        </form>  
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Publish;