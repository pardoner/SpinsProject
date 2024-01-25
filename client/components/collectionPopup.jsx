import React from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { makeCollectionEntry, makeCollection } from '../fetching';
import { useGetCollectionsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice


function CollectionPopup(props) {
  const { id } = useParams()
  const { data, error, isLoading } = useGetCollectionsQuery(props.token);
  const [newCollectionEntry, setNewCollectionEntry] = useState("Select a collection")
  


  function handleChange(event) {
    setNewCollectionEntry({value: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(newCollectionEntry)
    // -1 means we are asking to create a new collection first
    // then add album to new collection
    if (newCollectionEntry == -1) {
      const formData = Object.fromEntries(new FormData(event.target).entries())
      if (formData.newCollection == "") {
        return
      }
      console.log(formData)
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
      return <div>Loading...</div>; // is styles.loading pre-programmed?
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

function createNewCollection(name) {
   console.log(`trying to make new collection with token: ${props.token}`)
    if (props.token) {
    makeCollection({albumId: id, token: props.token, name: name})
      .catch(rejected => {
        setError(rejected)
      })
    }
}
 function addToCollection(collection_id) {
    console.log(`trying to add to collection with token: ${props.token}`)
    if (props.token) {
    makeCollectionEntry({album_id: id, token: props.token, collection_id: collection_id})
      .catch(rejected => {
        setError(rejected)
      })
    }
  }

    let handleCollectionChange = (e) => {
     setNewCollectionEntry(e.target.value)
     console.log(e.target.value)
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
            {(newCollectionEntry == -1) && <textarea name="newCollection"></textarea>}

            <button className="closeButton" >Submit</button>
            {props.children}
        </form>    
        </div>
    </div>
    ) : "";
}

export default CollectionPopup;


// if new collection selected, a second option opens for collection name 