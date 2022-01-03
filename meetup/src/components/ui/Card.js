import classes from './Card.module.css';

function Card(props) {
  // props.children is how you use this component to wrap other data
  // see MeetupItem.js (every component has a children prop)
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
