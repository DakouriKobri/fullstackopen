// NPM Packages
import { useEffect, useState } from 'react';
import axios from 'axios';

// Local Files
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3301/persons').then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

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
