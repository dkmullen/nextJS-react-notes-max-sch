function Backdrop(props) {
  // onClick is set to receive the properites of onCancel from
  // parent components
  return <div className="backdrop" onClick={props.onCancel} />;
}

export default Backdrop;
