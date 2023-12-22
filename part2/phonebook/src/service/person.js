// NPM Packages
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAllPersons() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function createPerson(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
}

export default { createPerson, getAllPersons };
