const Notification = ({notification}) => {
    const {text, success} = notification
    if(text === "") return null
    return (
        <div className={success ? "success" : "error"}>
            {text}
        </div>
    )
}

export default Notification