
Deployed site: https://spins.onrender.com


Hello!

Spins is an application designed to allow users to log and organize their record collections digitally, and to write reviews of albums they listen to. The name Spins stems from the radio industry term around spinning records. 

On the album page, a user can choose from 500 albums that were imported via a csv file containing information on the Rolling Stones Top 500 Albums of All Time. Album art is fetched from the Spotify API. The fetch only lasts for an hour before needing to request a new token, so the album page may have to be refreshed after 60 minutes if the user has been inactive for that long. 

Albums can be selected from the album page, and on the single album page a logged in user can add the album to a collection, create a review, or return to the full list of albums. If 'Add to Collection' is selected then a pop up is displayed with the option of adding the album to a current collection or creating a new one. 

Collections created will appear on the collection page, and by clicking on a collection the user can see their albums within it. Albums can be removed from a collection and entire collections may be deleted as well. 

If a review is created, it will show up with the current datestamp on the reviews page. Reviews can be deleted or edited if the user decides to give the album a second look. 

After completing a session of collection and reviewing, the user can log out using the button on the account page. 

One thing I struggled with was on getting the pages to automatically refresh on changes. If you go to the reviews or collections page and don't see anything, please refresh the page once or twice! Sorry for the trouble.