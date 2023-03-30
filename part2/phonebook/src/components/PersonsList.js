import personService from '../services/persons'

const PersonsList = ({ personsList, persons, setPersons }) => {

    const deletePerson = ( personToBeDeleted ) => {
        if (window.confirm(`delete ${personToBeDeleted.name}?`)) {
            personService
                .remove(personToBeDeleted.id)
                .then((response) => {
                    setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
                })
        }
    }

    return (
        <div>
            {personsList.map(person =>
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson( person )}>delete</button>
                </div>
            )}
        </div>
    )
}

export default PersonsList
