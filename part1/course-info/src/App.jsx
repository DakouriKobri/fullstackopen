function Header(props) {
  return <h1>{props.course}</h1>;
}

function Content(prop) {
  return (
    <>
      <p>
        {prop.part1} {prop.exercises1}
      </p>
      <p>
        {prop.part2} {prop.exercises2}
      </p>
      <p>
        {prop.part3} {prop.exercises3}
      </p>
    </>
  );
}

function Total(props) {
  return (
    <p>
      Number of exercises{' '}
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
}

function App() {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
}

export default App;
