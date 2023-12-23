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
    // Check if the person already exists in the phonebook
    const personInPhonebook = persons.find(
      (person) => person.name === newPerson.name
    );

    // If person already exists, check if his/her number needs to be updated
    // if yes, update; if no return
    if (personInPhonebook) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
        )
      ) {
        personService
          .updatePerson(personInPhonebook.id, newPerson)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
          });
      }
      return;
    }

    // If person is not already added to phonebook, had him/her
    personService.createPerson(newPerson).then((createdPerson) => {
      setPersons([...persons, createdPerson]);
    });
  }

  function handleDeletePerson(id) {
    const personToDelete = persons.find((person) => person.id === id);

    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
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
      <Persons people={filteredPersons} onDeletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;
