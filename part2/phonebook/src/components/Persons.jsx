function Persons({ people, onDeletePerson }) {
  const personsList = people.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{' '}
      <button type="button" onClick={() => onDeletePerson(person.id)}>
        Delete
      </button>
    </div>
  ));

  return <div>{personsList}</div>;
}

export default Persons;
