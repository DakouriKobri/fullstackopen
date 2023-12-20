function Header({ name }) {
  return <h1>{name}</h1>;
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

function Course({ course }) {
  const { name, parts } = course;
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
}

export default App;
