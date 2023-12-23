// NPM Packages
import { useEffect, useState } from 'react';

// Local Files
import CountriesList from './components/CountriesList';
import Filter from './components/Filter';
import countryService from './service/country';

function App() {
  const [countries, setCountries] = useState(null);
  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  function handleSearch(countryName) {
    setSearchedName(countryName);
  }

  if (!countries) return;

  return (
    <div>
      <h1>Countries Data</h1>

      <Filter searchedName={searchedName} onSearch={handleSearch} />
      <CountriesList countries={countries} searchedName={searchedName} />
    </div>
  );
}

export default App;
