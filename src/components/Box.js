import "./Box.css";

const Box = (props) => {
  const style = props.value === "X" ? "box x" : "box o";

  return (
    <button className={style} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Box;
