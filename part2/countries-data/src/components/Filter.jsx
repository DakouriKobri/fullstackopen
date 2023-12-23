function Filter({ onSearch, searchedName }) {
  return (
    <div>
      Find countries{' '}
      <input
        type="search"
        value={searchedName}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}
export default Filter;
