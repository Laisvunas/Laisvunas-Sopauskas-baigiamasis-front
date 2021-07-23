import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Navigation, Button, Notification } from "../../components";

const { backendUrlBase, siteName } = require('../../config');
const { successMsg, errorMsg } = require('../../utils/showMsg');

const View = (props) => {
    const [diagramId, setId] = useState();
    const [title, setTitle] = useState("");
    const [sentence, setSentence] = useState();
    const [code, setCode] = useState();
    const [commentary, setCommentary] = useState();
    const [editorCommentary, setEditorCommentary] = useState();
    const [author, setAuthor] = useState();
    const [diagramCreatorId, setDiagramCreatorId] = useState();
    
    const { id } = useParams();

    useEffect(() => {
        
        if (typeof id === 'undefined') {
            window.location.href = "/diagrams";
        }
        else {
            document.title = `View | ${siteName}`;
            loadDiagram(props);
        }
             
    }, []);

    const loadDiagram = (props) => {
        const url = `${backendUrlBase}/diagrams/view`;
        const token = localStorage.getItem("token");

        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    author_id: props.auth.author_id,
                    id: id,
                }),
            })
            .then((res) => res.json())
            .then((data) =>  {
                console.log("data: " + JSON.stringify(data));
                if (typeof data.error !== 'undefined') {
                    errorMsg(data.error);
                }
                else if (typeof data.data !== 'undefined' && data.data.length === 1) {
                    setTitle(data.data[0].title);
                    setSentence(data.data[0].sentence);
                    setCode(data.data[0].code);
                    setCommentary(data.data[0].commentary);
                    setEditorCommentary(data.data[0].editors_commentary === null ? "" : data.data[0].editors_commentary);
                    setAuthor(data.data[0].username);
                    setDiagramCreatorId(data.data[0].user_id);
                }
            });
        }
        catch (e) {
            errorMsg('Some error happened. Try again later.');
        }

    };

    return (
        <Container variant="wide">
            <div className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/diagrams" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 id="page-title" className="title is-2">{title}</h2>
                    <Notification variant='is-danger is-hidden' />
                    <div className="block">
                        <p>Author: {author}</p>
                    </div>
                    <div className="block">
                        <p>{sentence}</p>
                    </div>
                    <div className="block">
                        {code}
                    </div>
                    <h3 className="title is-5">Commentary:</h3>
                    <div className="block">
                        <p>{commentary}</p>
                    </div>
                    
                    {editorCommentary ?
                        <>
                            <h3 className="title is-5">Editor's Commentary:</h3>
                            <div className="block">
                                <p>{editorCommentary}</p>
                            </div>
                        </>
                    : ""
                    }
                    {props.auth.isEditor === 'y' || diagramCreatorId === props.auth.author_id ?
                    <div className="block">
                        <a className='button is-primary' href={`/publish/${id}`}>Edit</a>
                    </div>
                    : ""
                    }
                </div>
            </div>
        </Container>
    );
};



export default View;