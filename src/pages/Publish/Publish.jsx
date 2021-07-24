import React, { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Navigation, Input, Textarea, Button, Notification } from "../../components";

const { backendUrlBase, siteName } = require('../../config');
const { successMsg, errorMsg } = require('../../utils/showMsg');

const Publish = (props) => {
    const [diagramId, setId] = useState();
    const [title, setTitle] = useState("");
    const [sentence, setSentence] = useState();
    const [code, setCode] = useState();
    const [commentary, setCommentary] = useState();
    const [editorCommentary, setEditorCommentary] = useState();
    const [author, setAuthor] = useState();

    const { id } = useParams();

    useEffect(() => {
        console.log("1 id: " + id);
        if (typeof id === 'undefined') {
            document.title = `Publish | ${siteName}`;
        }
        else {
            setId(id);
            document.title = `Edit | ${siteName}`;
            getDiagramData(id);
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
                mode: 'cors',
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
                if (typeof data.msg !== 'undefined') {
                    successMsg(data.msg);
                    if (typeof data.data !== 'undefined' && typeof data.data.insertId !== 'undefined' && data.data.insertId !== 0) {
                        setId(data.data.insertId);
                        window.history.replaceState(null, null, `/publish/${data.data.insertId}`);
                        document.title = `Edit | ${siteName}`;
                        document.querySelector("#page-title").innerText = "Edit Diagram";
                    }
                }
                else if (typeof data.error !== 'undefined') {
                    errorMsg('Some error happened. Try again later.');
                }

            });
        }
        catch (e) {
            errorMsg('Some error happened. Try again later.');
        }
    };

    const getDiagramData = (id) => {
        const url = `${backendUrlBase}/diagrams/publish/${id}`;
        const token = localStorage.getItem("token");

        try {
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    author_id: props.auth.author_id,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                if (typeof data.error !== 'undefined') {
                    errorMsg(data.error);
                    const inputs = document.querySelectorAll('#publish_form input, #publish_form textarea, #publish_form button');
                    for (let i = 0; i < inputs.length; i += 1) {
                        inputs[i].disabled = true;
                    }
                }
                else if (typeof data.data !== 'undefined' && data.data.length === 1) {
                    setTitle(data.data[0].title);
                    setSentence(data.data[0].sentence);
                    setCode(data.data[0].code);
                    setCommentary(data.data[0].commentary);
                    setEditorCommentary(data.data[0].editors_commentary === null ? "" : data.data[0].editors_commentary);
                    setAuthor(data.data[0].username);
                }
                
            });
        }
        catch (e) {
            errorMsg('Some error happened. Try again later.');
        }
    };

    const deleteDiagram = (id) => {
        
        const retVal = window.confirm("Do you really want to delete this diagram?");
        if( retVal == false ) {
            return;
        }
        
        const url = `${backendUrlBase}/diagrams/delete/${id}`;
        const token = localStorage.getItem("token");

        try {
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id,
                    author_id: props.auth.author_id,
                    editor: props.auth.isEditor,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                if (typeof data.msg !== 'undefined') {
                    alert(data.msg);
                    window.location.href = "/publish";
                }
                else if (typeof data.error !== 'undefined') {
                    errorMsg(data.error);
                }
            });
        }
        catch (e) {
            errorMsg('Some error happened. Try again later.');
        }
    };

    return (
        <Container variant="wide">
            <div id="view" className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/publish" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 id="page-title" className="title is-2">{id ? 'Edit Diagram' : 'Publish Diagram'}</h2>
                    <Notification variant='is-success is-hidden' />
                    <Notification variant='is-danger is-hidden' />
                    <div id="publish-diagram">
                         <form
                            id="publish_form"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                publishDiagram();
                            }}
                        >
                            <p>{author ? `Author: ${author}` : (id && !title? <span>&nbsp;</span> : `Author: ${props.auth.username}`)} {id || diagramId ? <span className="is-pulled-right"><Button variant='is-danger' onClick={async (e) => {e.preventDefault(); deleteDiagram(id ? id : diagramId)}}>Delete Diagram</Button> <a className="button is-primary" href="/publish">New Diagram</a></span> : ""}</p>
                            <Input type="text" label="Title" placeholder="Title" minLength="5" required="required" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Textarea label="Sentence or Phrase" placeholder="Sentence or Phrase" required="required" value={sentence} rows={6} onChange={(e) => setSentence(e.target.value)} />
                            <Textarea label="Diagram Code" placeholder="Diagram Code" rows={10} required="required" value={code} onChange={(e) => setCode(e.target.value)} />
                            <Textarea label="Author's Commentary" placeholder="Author's Commentary" rows={6} value={commentary} onChange={(e) => setCommentary(e.target.value)} />

                            {(props.auth.isEditor === 'y') ? <Textarea label="Editor's Commentary" placeholder="Editor's Commentary" rows={6} value={editorCommentary} onChange={(e) => setEditorCommentary(e.target.value)} /> : ''}
                            
                            <Button variant='is-primary' type='submit'>Submit</Button> {title && (id || diagramId) ? <a href={`/view/${id ? id : (diagramId ? diagramId : '')}`} className="button is-primary" target="_blank">View</a> : ""}
                        </form>  
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Publish;