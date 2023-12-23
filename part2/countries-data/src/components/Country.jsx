function Country({ country }) {
  const { area, capital, flags, languages, name } = country;

  const languagesList = Object.values(languages).map((language) => (
    <li key={language}>{language}</li>
  ));

  return (
    <div>
      <h2>{name.common}</h2>

      <div>
        <div>Capital: {capital[0]}</div>
        <div>Area: {area}</div>
      </div>

      <h3>Language:</h3>
      <ul>{languagesList}</ul>

      <img src={flags.png} alt={flags.alt} height={150} />
    </div>
  );
}
export default Country;
