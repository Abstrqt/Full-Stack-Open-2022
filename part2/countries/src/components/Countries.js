import CountryData from './CountryData'

const Countries = ({countriesToShow, setCountriesToShow}) => {
  if(countriesToShow.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  else if(countriesToShow.length > 1 && countriesToShow.length <=10){
    return(
      <ul>
        {countriesToShow.map(country => (
        <li key={country.name}>
          {country.name}{" "}
          <button onClick={() => setCountriesToShow([country])}>show</button>
        </li>))}
      </ul>
    )
  }
  else if(countriesToShow.length === 1){
    return <CountryData country={countriesToShow[0]}/>
  }
}
export default Countries