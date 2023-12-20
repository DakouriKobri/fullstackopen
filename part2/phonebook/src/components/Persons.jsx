function Persons({ people }) {
  const personsList = people.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ));

  return <div>{personsList}</div>;
}

export default Persons;
