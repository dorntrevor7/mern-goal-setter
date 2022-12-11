function GoalItem({ goal }) {
  return (
    <div>
      <div>{new Date(goal.createdAt).toLocaleString("en-15")}</div>
      <h2>{goal.text}</h2>
    </div>
  );
}

export default GoalItem;
