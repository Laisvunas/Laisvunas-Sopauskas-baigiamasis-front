import React, { useState, useEffect } from "react";
import { Container, Navigation, Notification, A } from "../../components";

const { backendUrlBase, siteName } = require('../../config');
const { errorMsg } = require('../../utils/showMsg');

const Diagrams = (props) => {
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);

    const prepareOtherUsersDiagrams = (diagramsArr) => {
        const diagramsArr2 = JSON.parse(JSON.stringify(diagramsArr));
        for (let i = 1; i < diagramsArr.length; i++) {
            if (diagramsArr[i].username === diagramsArr[i-1].username) {  
                diagramsArr2[i].username = "";
            }
        }
        return diagramsArr2;
    };
      
    useEffect(() => {
        document.title = `My diagrams | ${siteName}`;
        const getList =  async (req, res) => {
        
            const url = `${backendUrlBase}/diagrams/all`;
            
            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        author_id: props.auth.author_id,
                        isEditor: props.auth.isEditor,
                    }),
                }).then((res) => res.json())
                  .then((res) => {
    
                    if (typeof res.error !== 'undefined') {
                        errorMsg('Some error happened. Try again later.');
                        return;
                    }
                    else if (typeof res.loggedUserDiagrams !== 'undefined') {
                        setList(res.loggedUserDiagrams);  
                    }
    
                    if (typeof res.otherUsersDiagrams !== 'undefined' && res.otherUsersDiagrams.length > 0) {
                        const otherUsersDiagrams = prepareOtherUsersDiagrams(res.otherUsersDiagrams);
                        setList2(otherUsersDiagrams);
                    }
                    
                });
            } catch (e) {
                console.log(e);
                errorMsg('Some error happened. Try again later.');
            }
            
        };
        getList();
    }, [props.auth.author_id, props.auth.isEditor]);
    
    return (
        <Container variant="wide">
            <div className="columns">
                <aside className="column is-3 aside hero is-fullheight">
                    <Navigation activeUrl="/diagrams" userName={props.auth.username}></Navigation>
                </aside>
                <div className="column is-9 messages hero is-fullheight">
                    <h1 className="title is-1">{siteName}</h1>
                    <h2 className="title is-2">Diagrams by {props.auth.username}</h2>
                    <Notification variant='is-danger is-hidden' />
                    <div id="diagram-list">
                        {list.length === 0 ? <div className="block">No diagrams found.</div> : ''}
                        {list.map((item) => (
                            <div key={item.id} className="block">
                                <h3 className="is-inline-block is-size-5 has-text-weight-semibold"><A href={`/view/${item.id}`}>{item.title}</A></h3>
                                <p className="greek-text">{item.sentence}</p>
                                {item.editors_commentary !== null ? <p className="has-text-danger">Editor's commentary</p>: ""}
                                <p><A href={`/publish/${item.id}`}>Edit</A></p>
                            </div>
                        ))}
                        {list2.map((item) => (
                            <div key={item.id} className="block">
                                {item.username !== "" ? <h2 className="title is-2">Diagrams by {item.username}</h2>: ""}
                                <h3 className="is-inline-block is-size-5 has-text-weight-semibold"><A href={`/view/${item.id}`}>{item.title}</A></h3>
                                <p className="greek-text">{item.sentence}</p>
                                {item.editors_commentary !== null ? <p className="has-text-danger">Editor's commentary</p>: ""}
                                {props.auth.isEditor === "y" ? <p><A href={`/publish/${item.id}`}>Edit</A></p> : ""}
                            </div>
                        ))}
                    </div>
                </div>
            </div>   
        </Container>
    );
};

export default Diagrams;