import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Quote = ({text, votes}) => <p>{text}<br/>has {votes} votes</p>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const setRandom = () => {
    let random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
  }

  const incrementVote = () => {
    let copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  const mostVoted = () => {
    let idx = 0;
    let max = 0;
    for(let i=0; i<points.length; i++){
      if(points[i] > max){
        idx = i;
        max = points[i]
      }
    }
    return idx
  }

  return (
    <div>
      <Heading text="Anecdote of the day"/>
      <Quote text={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={incrementVote} text="vote"/>
      <Button handleClick={setRandom} text="next anecdote"/>
      <Heading text="Anecdote with most votes"/>
      <Quote text={anecdotes[mostVoted()]} votes={points[mostVoted()]}/>
    </div>
  )
}

export default App