import React from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { useGetCollectionsQuery, useAddCollectionEntryMutation, useAddCollectionMutation } from '../api/spinsapi'; // switch to these 
import Cookies from 'js-cookie';


function CollectionPopup(props) {
  const { id } = useParams()
  const { data, error, isLoading } = useGetCollectionsQuery(props.token);
  const [newCollectionEntry, setNewCollectionEntry] = useState(-1)
  const [addCollectionEntry, {error: entryError, isLoading: entryIsLoading }] = useAddCollectionEntryMutation();
  const [addCollection, {error: collectionError, isLoading: collectionIsLoading}] = useAddCollectionMutation();


  function handleChange(event) {
    setNewCollectionEntry({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newCollectionEntry == -1) {
      const formData = Object.fromEntries(new FormData(event.target).entries())
      if (formData.newCollection == "") {
        return
      }
      createNewCollection(formData.newCollection)
      props.setTrigger(false)
      alert('Added to collection: ' + formData.newCollection)
    } else {
    addToCollection(data[newCollectionEntry].id)
    props.setTrigger(false)
    alert('Added to collection: ' + data[newCollectionEntry].name);
    }
  }

  if (isLoading) {
      return <div><img className="loading" src="https://www.jimphicdesigns.com/downloads/imgs-mockup/pixelated-hourglass-loading.gif"/></div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

function createNewCollection(name) {
    if (Cookies.get("token")) {
      addCollection({token: Cookies.get("token"), albumId: id, name: name})
      .catch(rejected => {
        setError(rejected)
      })
    }
}
 function addToCollection(collection_id) {
    if (Cookies.get('token')) {
      addCollectionEntry({albumId: id, token: Cookies.get("token"), collection_id: collection_id})
      .catch(rejected => {
        setError(rejected)
      })
    }
  }

    let handleCollectionChange = (e) => {
     setNewCollectionEntry(e.target.value)
    }
    return (props.trigger) ? (
    <div className = "popUp">
        <div className="popUp-inner">
        <h3>Add to Collection</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Select a collection or create a new one:
                <br></br>
                <select onChange={handleCollectionChange} value={newCollectionEntry}>
                  <optgroup label="--Select a Collection--">
                    {data.map((collection, index) => <option key={index} value={index}>{collection.name}</option>)}
                    <option key={-1} value={-1}>New Collection</option>
                  </optgroup>
                </select>            
            </label>
            <br></br>
            {(newCollectionEntry == -1) && <textarea rows="1" placeholder ="New Collection Name" name="newCollection"></textarea>}

            <button className="closeButton btn btn-secondary" >Submit</button>
            {props.children}
        </form>    
        </div>
    </div>
    ) : "";
}

export default CollectionPopup;


