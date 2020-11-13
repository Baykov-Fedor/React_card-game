import "./modal-window.styles.scss";

function ModalWindow(props) {
  return <div className="modal-window">{props.children}</div>;
}

export default ModalWindow;
