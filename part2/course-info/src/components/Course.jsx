function Header({ name }) {
  return <h2>{name}</h2>;
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

function Content({ parts }) {
  const partsList = parts.map((part) => <Part key={part.id} part={part} />);
  return <>{partsList}</>;
}

function Total({ sum }) {
  return <strong>Total of {sum} exercises</strong>;
}

function Course({ course }) {
  const { name, parts } = course;
  const sumOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={sumOfExercises} />
    </>
  );
}

export default Course;
