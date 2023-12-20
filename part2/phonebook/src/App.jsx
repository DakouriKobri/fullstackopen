// NPM Packages
import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  function addName(event) {
    event.preventDefault();

    const newNameObject = {
      name: newName,
    };

    setPersons(persons.concat(newNameObject));
    setNewName('');
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  const personsList = persons.map((person) => (
    <div key={person.name}>{person.name}</div>
  ));
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>{personsList}</div>
    </div>
  );
}

export default App;
