import personService from '../services/persons'

const PersonsList = ({ personsList, persons, setPersons, setErrorMessage, setErrorColor }) => {

    const deletePerson = ( personToBeDeleted ) => {
        if (window.confirm(`delete ${personToBeDeleted.name}?`)) {
            personService
                .remove(personToBeDeleted.id)
                .then(() => {
                    setErrorMessage(`Removed information of ${personToBeDeleted.name}`)
                    setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
                    setTimeout(() => { setErrorMessage(null) }, 5000)
                })
                .catch(error => {
                    setErrorColor('red')
                    setErrorMessage(`Information of ${personToBeDeleted.name} could not be removed`)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setErrorColor('green')
                    }, 5000)
                    personService
                    .getAll()
                    .then(initialPersons => {
                      setPersons(initialPersons)
                    })
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
