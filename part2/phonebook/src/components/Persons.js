const Persons = ({peopleToShow}) => {
    return (
        <ul>
            {peopleToShow.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons