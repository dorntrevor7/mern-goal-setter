import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const styles = {
    div: {
      padding: "50px",
      fontFamily: "Helvetica",
      fontFamily: "Helvetica",
      border: "1px solid black",
      borderRadius: "5px",
    },
    input: {
      width: "50vw",
      marginTop: "10px",
      marginBottom: "10px",
      color: "black",
      border: "1px solid black",
    },
  };

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const userGoal = {
      text,
    };

    dispatch(createGoal(userGoal));
    setText("");
  };
  return (
    <section style={styles.div}>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">
            <strong>New Goal!</strong>
          </label>
        </div>
        <br />
        <div className="form-group">
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your goal here"
          />
        </div>
        <br />
        <div className="form-group">
          <Button variant="outline-primary" type="submit" onClick={onSubmit}>
            Add Goal
          </Button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
