// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/person';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
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
          })
          .catch((error) => {
            console.log(error.message);
            setNotificationMessage(
              `Information of ${personInPhonebook.name} has already been removed from server`
            );
            console.log('error updating person:', error.response.data.error);
            setIsError(true);
            setNotificationMessage(error.response.data.error);
          })
          .finally(() => setShowMessage(true));
      }
      return;
    }

    // If person is not already added to phonebook, had him/her
    personService
      .createPerson(newPerson)
      .then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setNotificationMessage(`Added ${createdPerson.name}`);
        setIsError(false);
      })
      .catch((error) => {
        console.log('error creating person:', error.response.data.error);
        setIsError(true);
        setNotificationMessage(error.response.data.error);
      })
      .finally(() => setShowMessage(true));
  }

  function handleDeletePerson(id) {
    const personToDelete = persons.find((person) => person.id === id);

    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setNotificationMessage(`Deleted ${personToDelete.name}`);
      setIsError(true);
      setShowMessage(true);
    });
  }

  function handleSearch(term) {
    setSearchedTerm(term);
  }

  const filteredPersons = persons.filter((person) => {
    return person?.name?.toLowerCase().includes(searchedTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>

      {showMessage && (
        <Notification message={notificationMessage} isError={isError} />
      )}
      <Filter searchedTerm={searchedTerm} onSearch={handleSearch} />

      <h2>Add a New Entry</h2>
      <PersonForm onAddPerson={handleAddPerson} />

      <h2>Numbers</h2>
      <Persons people={filteredPersons} onDeletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;
