function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }
  // Could also pass these directly to the button as onClick={props.onConfirm}
  function confirmHander() {
    props.onConfirm();
  }

  return (
    <div className="modal">
      <p>You sure about that?</p>
      <button className="btn btn--alt" onClick={cancelHandler}>
        Cancel
      </button>
      <button className="btn" onClick={confirmHander}>
        Do It
      </button>
    </div>
  );
}

export default Modal;
