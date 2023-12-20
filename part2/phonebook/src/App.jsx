// NPM Packages
import { useState } from 'react';

// Local Files
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [searchedTerm, setSearchedTerm] = useState('');

  function handleAddPerson(newPerson) {
    persons.forEach((person) => {
      if (person.name === newPerson.name) {
        alert(`${newPerson.name}  is already added to phonebook.`);
        throw new Error(`${newPerson.name}  is already added to phonebook.`);
      }
    });
    const newPersonObject = { ...newPerson, id: persons.length + 1 };
    setPersons(persons.concat(newPersonObject));
  }

  function handleSearch(term) {
    setSearchedTerm(term);
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchedTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchedTerm={searchedTerm} onSearch={handleSearch} />

      <h3>Add a New Entry</h3>
      <PersonForm onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <Persons people={filteredPersons} />
    </div>
  );
}

export default App;
