import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  // use state always returns an array of two elements, the first
  // being a snapshot of current state, the second a function for updating state

  const [isLoading, setIsLoading] = useState(true); // sets is loading to true
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://max-react-b3e6c-default-rtdb.firebaseio.com/meetups.json')
      .then((response) => {
        return response.json(); // json also returns a promise
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          // Here we convert the object returned to an array
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []); // Empty dependencies array; useEffect wiill run the code
  // inside (the fetch) on load and then when dependencies change.
  // In this case, it runs just on load (otherwise, infinite loop)

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <div>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
}

export default AllMeetupsPage;
