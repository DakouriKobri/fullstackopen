function Filter({ onSearch, searchedTerm }) {
  return (
    <div>
      Filter show with{' '}
      <input
        type="search"
        value={searchedTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default Filter;
