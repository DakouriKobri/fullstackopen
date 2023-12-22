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
    axios.get('http://localhost:3001/persons').then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

  function handleAddPerson(newPerson) {
    const isAlreadyInPhonebook = persons.some(
      (person) => person.name === newPerson.name
    );

    if (isAlreadyInPhonebook) {
      alert(`${newPerson.name}  is already added to phonebook.`);
      return;
    }

    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      const createdPerson = response.data;
      setPersons([...persons, createdPerson]);
    });
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
