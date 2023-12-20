// NPM Packages
import { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedTerm, setSearchedTerm] = useState('');

  function addName(event) {
    event.preventDefault();

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName}  is already added to phonebook.`);
        throw new Error(`${newName}  is already added to phonebook.`);
      }
    });

    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newNameObject));
    setNewName('');
    setNewNumber('');
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleSearch(event) {
    setSearchedTerm(event.target.value);
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchedTerm.toLowerCase())
  );

  const personsList = filteredPersons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ));

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        Filter show with{' '}
        <input type="search" value={searchedTerm} onChange={handleSearch} />
      </div>

      <form onSubmit={addName}>
        <h2>Add a New Entry</h2>

        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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
