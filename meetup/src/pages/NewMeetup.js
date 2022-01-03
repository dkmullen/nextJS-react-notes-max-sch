import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const history = useHistory();
  function addMeetupHandler(meetupData) {
    // fetch is a vanilla-browser-js way to do api requests
    // adding 'meetup' at the end tells firebase to make a new dir
    fetch('https://max-react-b3e6c-default-rtdb.firebaseio.com/meetups.json', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      // replace means user can't navigate back - ie, replace current
      // page in the history stack
      history.replace('/');
    });
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
