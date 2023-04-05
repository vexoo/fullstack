import personService from '../services/persons'
import { displayMessage } from './Notification'

const PersonsList = ({ personsList, persons, setPersons, setErrorMessage, setErrorColor }) => {

    const deletePerson = ( personToBeDeleted ) => {
        if (window.confirm(`delete ${personToBeDeleted.name}?`)) {
            personService
                .remove(personToBeDeleted.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
                    displayMessage(`Removed information of ${personToBeDeleted.name}`, false, setErrorMessage, setErrorColor)
                })
                .catch(error => {
                    displayMessage(`Information of ${personToBeDeleted.name} could not be removed`, true, setErrorMessage, setErrorColor)
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
