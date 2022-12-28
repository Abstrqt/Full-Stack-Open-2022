const Persons = ({peopleToShow, deletePerson}) => {
    return (
        <ul>
            {peopleToShow.map((person) => (
                <li key={person.name}>{person.name} {person.number}
                    {" "}
                    <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default Persons