import personsService from "../services/persons";

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setErrorMessage, setError }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newName === '' || newNumber === '')
            return;

        const checkPhonebook = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
        if (checkPhonebook) {
            if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
                return;
            await personsService.updatePerson(checkPhonebook.id, { ...checkPhonebook, number: newNumber })
                .then((data) => {
                    const personsCopy = persons.filter(person => person.id !== data.id)
                    setPersons(personsCopy.concat(data))
                })
            return;
        }


        await personsService.addPerson(newName, newNumber)
            .then((data) => {
                setPersons(persons.concat(data))
                setError(false)
                setErrorMessage(`Added ${newName}`)
                setTimeout(() => setErrorMessage(null), 5000);
            })
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