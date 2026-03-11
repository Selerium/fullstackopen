import personsService from "../services/persons";

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newName === '' || newNumber === '')
            return ;

        if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()))
            return window.alert(`${newName} is already added to phonebook`)

        await personsService.addPerson(newName, newNumber)
            .then((data) => setPersons(persons.concat(data)))
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