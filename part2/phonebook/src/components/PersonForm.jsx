const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()))
          return window.alert(`${newName} is already added to phonebook`)
        setPersons(persons.concat({name: newName, number: newNumber}));
      }
    
    return (
        <form onSubmit={handleSubmit} >
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form >
    )
}

export default PersonForm;