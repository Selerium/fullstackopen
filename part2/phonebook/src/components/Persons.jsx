import personsService from "../services/persons";

const Persons = ({ persons, setPersons, setError, setErrorMessage }) => {
    return persons.map(person =>
        <div key={person.name}>
            {person.name} {person.number}
            <button style={{ display: "inline" }} onClick={async () => {
                if (window.confirm(`Delete ${person.name}?`)) {
                    await personsService.deletePerson(person.id)
                        .then((success) => setPersons(persons.filter(newPerson => newPerson.id != person.id)))
                        .catch((failure) => {
                            setError(true)
                            setErrorMessage(`Information of ${person.name} has already been removed from server`)
                            setPersons(persons.filter(newPerson => newPerson.id != person.id))
                            setTimeout(() => setErrorMessage(null), 5000);
                        })
                }
            }
            }>delete</button>
        </div>)
}

export default Persons;