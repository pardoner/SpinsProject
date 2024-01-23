import React from 'react';

function CreateCollection(props) {
    return (props.trigger) ? (
    <div className = "popUp">
        <div className="popUp-inner">
            <button className="closeButton" onClick={() => props.setTrigger(false)}>Submit</button>
            {props.children}
        </div>
    </div>
    ) : "";
}

export default CreateCollection;