// NPM Packages
import { useState } from 'react';

function PersonForm({ onAddPerson }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    onAddPerson(newPerson);
    setNewName('');
    setNewNumber('');
  }

  return (
    <form onSubmit={addPerson}>
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
  );
}

export default PersonForm;
