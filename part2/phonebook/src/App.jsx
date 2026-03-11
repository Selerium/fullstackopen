import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => console.log(response))
  }, [])

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const filteredPersons = searchFilter ? persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App