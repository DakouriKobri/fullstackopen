// NPM Packages
import { useState } from 'react';

// Local Files
import { lowerCase } from '../utils';
import Country from './Country';

function CountriesList({ countries, searchedName }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!searchedName) return;

  const filteredCountries = countries.filter(
    (country) =>
      lowerCase(country.name.common).includes(lowerCase(searchedName)) ||
      lowerCase(country.name.official).includes(lowerCase(searchedName))
  );

  if (filteredCountries.length > 10) {
    return (
      <div style={{ color: 'red' }}>
        Too many matches, specify another filter
      </div>
    );
  }

  if (filteredCountries.length > 1) {
    const countriesList = filteredCountries.map((country) => {
      const name = country.name.common;
      return (
        <div key={name}>
          {name}{' '}
          <button type="button" onClick={() => setSelectedCountry(country)}>
            show
          </button>
        </div>
      );
    });

    return (
      <div>
        <div>{countriesList}</div>
        {selectedCountry && <Country country={selectedCountry} />}
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  return;
}

export default CountriesList;
