// NPM Packages
import { useState } from 'react';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
];

const votesArray = Array(8).fill(0);

function MostVotedAnecdote({ anecdote, highestVote }) {
  if (highestVote === 0) {
    return <p>No anecdote was voted yet.</p>;
  }
  return (
    <>
      <h3>&quot;{anecdote}&quot;</h3>
      <p>has {highestVote} votes</p>
    </>
  );
}

function App() {
  const [selected, setSelected] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(votesArray);

  function handleSelected() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  function handleVote() {
    const newAnecdotesVotes = [...anecdotesVotes];
    newAnecdotesVotes[selected] += 1;
    setAnecdotesVotes(newAnecdotesVotes);
  }

  function mostVoted() {
    let index = 0;
    let highestVote = 0;
    for (let i = 0; i < anecdotesVotes.length; i++) {
      if (anecdotesVotes[i] > highestVote) {
        highestVote = anecdotesVotes[i];
        index = i;
      }
    }

    return { index, highestVote };
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <h3>&quot;{anecdotes[selected]}&quot;</h3>
      <p>has {anecdotesVotes[selected]} votes</p>
      <button onClick={handleVote} type="button">
        👍 Vote
      </button>
      <button onClick={handleSelected} type="button">
        Next Anecdote
      </button>

      <h2>Anecdote with most Votes</h2>
      <MostVotedAnecdote
        anecdote={anecdotes[mostVoted().index]}
        highestVote={mostVoted().highestVote}
      />
    </div>
  );
}

export default App;
