// NPM Packages
import { useState } from 'react';

function Button({ title, onClick }) {
  return (
    <button onClick={onClick} type="button">
      {title}
    </button>
  );
}

function StatisticsLine({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics({ feedback }) {
  const { good, neutral, bad, total, averageScore, positivePercent } = feedback;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine name="Good" value={good} />
        <StatisticsLine name="Neutral" value={neutral} />
        <StatisticsLine name="Bad" value={bad} />
        <StatisticsLine name="All" value={total} />
        <StatisticsLine name="Average" value={averageScore} />
        <StatisticsLine name="Positive" value={positivePercent + '%'} />
      </tbody>
    </table>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  let averageScore = 0;
  let positivePercent = 0;

  if (total > 0) {
    averageScore = (+1 * good + 0 * neutral + -1 * bad) / total;
    positivePercent = (good / total) * 100;
  }

  const feedback = { good, neutral, bad, total, averageScore, positivePercent };

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
      <Statistics feedback={feedback} />
    </div>
  );
}

export default App;
