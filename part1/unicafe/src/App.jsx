// NPM Packages
import { useState } from 'react';

function Button({ title, onClick }) {
  return (
    <button onClick={onClick} type="button">
      {title}
    </button>
  );
}

function RawStatistics({ feedback }) {
  const { good, neutral, bad } = feedback;
  return (
    <>
      <div>
        good <span>{good}</span>
      </div>
      <div>
        neutral <span>{neutral}</span>
      </div>
      <div>
        good <span>{bad}</span>
      </div>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  function handleGood() {
    const newGood = good + 1;
    setGood(newGood);
  }

  function handleNeutral() {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  }

  function handleBad() {
    const newBad = bad + 1;
    setBad(newBad);
  }

  return (
    <div>
      <h1>Give your feedback</h1>

      <Button onClick={handleGood} title="Good" />
      <Button onClick={handleNeutral} title="Neutral" />
      <Button onClick={handleBad} title="Bad" />

      <h2>Statistics</h2>
      <RawStatistics feedback={feedback} />
    </div>
  );
}

export default App;
