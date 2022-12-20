import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({name: "", number: ""})
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    let nameArr = persons.map(person => person.name)
    if(nameArr.includes(newName.name)) alert(`${newName.name} is already added to the phonebook`)
    else setPersons(persons.concat({name: newName.name, number: newName.number}))
  }

  const handleNameChange = (event) => {
    let copy = {...newName}
    copy.name = event.target.value
    setNewName(copy)
  }

  const handleNumberChange = (event) => {
    let copy = {...newName}
    copy.number = event.target.value
    setNewName(copy)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        submitHandler={addPerson} 
        newName={newName} 
        nameHandler={handleNameChange} 
        numberHandler={handleNumberChange}
      />
      <h3>Numbers</h3>  
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App