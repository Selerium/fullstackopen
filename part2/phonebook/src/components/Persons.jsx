import personsService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
    return persons.map(person =>
        <div key={person.name}>
            {person.name} {person.number}
            <button style={{ display: "inline" }} onClick={async () => {
                if (window.confirm(`Delete ${person.name}?`)) {
                    await personsService.deletePerson(person.id)
                    setPersons(persons.filter(newPerson => newPerson.id != person.id))
                }
            }}>delete</button>
        </div>)
}

export default Persons;