// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './service/person';

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');

  useEffect(() => {
    personService.getAllPersons().then((allPersons) => {
      setPersons(allPersons);
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

    personService.createPerson(newPerson).then((createdPerson) => {
      setPersons([...persons, createdPerson]);
    });
  }

  function handleSearch(term) {
    setSearchedTerm(term);
  }

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchedTerm.toLowerCase());
  });

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
