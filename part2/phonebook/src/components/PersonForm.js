const PersonForm = ({submitHandler, newName, nameHandler, numberHandler}) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={newName.name} onChange={nameHandler}/>
            </div>
            <div>
                number: <input value={newName.number} onChange={numberHandler}/>
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm
