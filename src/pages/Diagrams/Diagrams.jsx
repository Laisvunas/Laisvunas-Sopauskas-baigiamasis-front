import React, { useContext, useState, useEffect } from "react";
import { Container, Navigation, Notification } from "../../components";

const { backendUrlBase, siteName } = require('../../config');

const Diagrams = (props) => {
    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);

    const getList =  (req, res) => {
        
        const url = `${backendUrlBase}/diagrams/all`;
        
        try {
            fetch(url, {
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
                    // console.log(data.error);
                    document.querySelector('.notification.is-danger > div.notification-body').innerText = 'Some error happened. Try again later.';
                    document.querySelector('.notification.is-danger').classList.remove('is-hidden');
                    document.querySelector('.notification.is-danger').style.display = 'block';
                    return;
                }
                else if (typeof res.loggedUserDiagrams !== 'undefined' && res.loggedUserDiagrams.length > 0) {
                    setList(res.loggedUserDiagrams);
                    if (typeof res.otherUsersDiagrams !== 'undefined' && res.otherUsersDiagrams > 0) {
                        setList2(res.otherUsersDiagrams);
                    }
                }
                else if (typeof res.loggedUserDiagrams !== 'undefined' && res.loggedUserDiagrams.length === 0) {
                    document.querySelector('#diagram-list').innerHTML = 'No diagrams found.';
                }
            });
        } catch (e) {
            console.log(e);
            document.querySelector('.notification.is-danger > div.notification-body').innerText = 'Some error happened. Try again later.';
            document.querySelector('.notification.is-danger').classList.remove('is-hidden');
            document.querySelector('.notification.is-danger').style.display = 'block';
        }
        
      };
      
      useEffect(() => {
        getList();
      }, []);
    
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
                    <div id="diagram-list"></div>
                </div>
            </div>   
        </Container>
    );
};

export default Diagrams;