import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  useEffect(() => {
    personsService.getPersons().then((data) => setPersons(data))
  }, [])

  const [persons, setPersons] = useState([])
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
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App