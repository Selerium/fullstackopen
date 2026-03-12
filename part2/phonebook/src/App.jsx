import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useEffect } from 'react'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  useEffect(() => {
    personsService.getPersons().then((data) => setPersons(data))
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)

  const filteredPersons = searchFilter ? persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error={error} />
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setError={setError}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setError={setError}
        setErrorMessage={setErrorMessage}
      />
    </div>
  )
}

export default App