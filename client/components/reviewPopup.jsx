import React from 'react';
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { makeReview } from '../fetching';
import { useGetReviewsQuery } from '../src/api/spinsapi'; // Import the generated hook from our RTK Query API slice


function ReviewPopup(props) {
  const { id } = useParams()
  const { data, error, isLoading } = useGetReviewsQuery(props.token);
  const [newReview, setNewReview] = useState("Select a collection")
  


  function handleChange(event) {
    setNewReview({value: event.target.value});
  }

console.log("updated")
  function handleSubmit(event) {
    event.preventDefault();
    console.log(newReview)
    if (newReview == -2) {
        return
    }

    if (newReview == -1) {
		// document.getElementById('div1').innerHTML = 'Other: <input type="text" name="other" />';
      //TODO: add logic for entering new collection name
      // createNewCollection("new collection name")
    } else {
    addToReviews(data[newReview].id)
    props.setTrigger(false)
    alert('Added to reviews: ' + data[newReview].name);
    }
  }

  if (isLoading) {
      return <div>Loading...</div>; // is styles.loading pre-programmed?
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

function createNewReview(album) {
   console.log(`trying to make new review with token: ${props.token}`)
    if (props.token) {
    makeReview({albumId: id, token: props.token})
      .catch(rejected => {
        setError(rejected)
      })
    }
}
 function addToReviews() {
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
                    <select onChange={handleCollectionChange} value={newCollectionEntry}>
                        <option value={-2}>--Select a Collection--</option>
                        <option key={-1} value={-1}>New Collection</option>
                        {data.map((collection, index) => <option key={index} value={index}>{collection.name}</option>)}
                    </select>
                </label>
                <button className="closeButton" >Submit</button>
                {props.children}
            </form>    
        </div>
    </div>
    ) : "";
}

export default CollectionPopup;


// if new collection selected, a second option opens for collection name 