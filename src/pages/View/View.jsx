import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Navigation, Button, Notification } from "../../components";
import DOMPurify from 'dompurify';

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
                    // const blocks = document.querySelectorAll(".block");
                    // for (let i = 0; i < blocks.length; i++) {
                    //     blocks[i].style.display = "none"; 
                    // }
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

        <div id="view" className="columns">
            <aside id="view-page-aside" className="column aside hero is-2 is-fullheight">
                <Navigation activeUrl="/diagrams" userName={props.auth.username}></Navigation>
            </aside>
            <div className="column messages hero is-fullheight">
                <h1 className="title is-1">{siteName}</h1>
                <h2 id="page-title" className="title is-2">{title}</h2>

                <Container variant="text">
                    <Notification variant='is-danger is-hidden' />
                </Container>
                
                {author ?
                <div className="block">
                    <p>Author: {author}</p>
                </div>
                : ""
                }
                
                {sentence ?
                <div className="block greek-text">
                    <Container variant="text">
                        {sentence}
                    </Container>
                </div>
                : ""
                }
                
                <div className="block greek-text" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(code)}}>

                </div>
                
                {commentary ?
                <div className="block">
                    <Container variant="text">
                        <p>{commentary}</p>
                    </Container>
                </div>
                : ""
                }
                
                
                {editorCommentary ?
                    <>
                        <h3 className="title is-6">Editor's Commentary:</h3>
                        <div className="block">
                            <Container variant="text">
                                <p>{editorCommentary}</p>
                            </Container>
                        </div>
                    </>
                : ""
                }
                {author && (props.auth.isEditor === 'y' || diagramCreatorId === props.auth.author_id) ?
                <div className="block">
                    <a className='button is-primary' href={`/publish/${id}`}>Edit</a>
                </div>
                : ""
                }
            </div>
        </div>

    );
};



export default View;