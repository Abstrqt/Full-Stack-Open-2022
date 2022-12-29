import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({name: "", number: ""})
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({text: "", success: false})

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    let nameArr = persons.map(person => person.name)
    let cur = persons.filter(person => person.name === newName.name)
    if(nameArr.includes(newName.name) && window.confirm(`${newName.name} is already added to the phonebook, replace the old number with a new one?`)){
      personService
        .update(cur[0].id, newName)
        .then(response => {
          setNotification({text: `Changed phone number for ${newName.name}`, success: true})
          setTimeout(() => {
            setNotification({text: "", success: false})
          }, 1000);
          let updated = persons.map(person => person.id !== response.id ? person : response)
          setPersons(updated)
        })
    } 
    else {
      personService
        .create(newName)
        .then(response => {
          setNotification({text: `Added ${newName.name}`, success: true})
          setTimeout(() => {
            setNotification({text: "", success: false})
          }, 1000);
          setPersons(persons.concat(response))
        })
    }
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}`)){
      personService
        .remove(id)
        .then(response => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setNotification({text: `Information of ${name} has already been removed from server`, success: false})
          setTimeout(() => {
            setNotification({text: "", success: false})
          }, 1000);
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Notification notification={notification}/>
      <Filter value={filter} handler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        submitHandler={addPerson} 
        newName={newName} 
        nameHandler={handleNameChange} 
        numberHandler={handleNumberChange}
      />
      <h3>Numbers</h3>  
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App