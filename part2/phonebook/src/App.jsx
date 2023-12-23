// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './service/person';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('Added Yawah');
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAllPersons().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowMessage(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [showMessage]);

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
            setNotificationMessage(
              `Updated ${updatedPerson.name}'s phone number`
            );
            setIsError(false);
            setShowMessage(true);
          })
          .catch((error) => {
            console.log(error.message);
            setNotificationMessage(
              `Information of ${personInPhonebook.name} has already been removed from server`
            );
            setIsError(true);
            setShowMessage(true);
          });
      }
      return;
    }

    // If person is not already added to phonebook, had him/her
    personService.createPerson(newPerson).then((createdPerson) => {
      setPersons([...persons, createdPerson]);
      setNotificationMessage(`Added ${createdPerson.name}`);
      setIsError(false);
      setShowMessage(true);
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

      {showMessage && (
        <Notification message={notificationMessage} isError={isError} />
      )}
      <Filter searchedTerm={searchedTerm} onSearch={handleSearch} />

      <h3>Add a New Entry</h3>
      <PersonForm onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <Persons people={filteredPersons} onDeletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;
