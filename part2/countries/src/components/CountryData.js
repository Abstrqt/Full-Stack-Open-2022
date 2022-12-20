import WeatherData from "./WeatherData"

const CountryData = ({country}) => {
    return(
        <div>
          <h1>{country.name}</h1>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h2>languages:</h2>
          <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flags.png} alt={`${country.name} flag`}/>
          <WeatherData city={country.capital}/>
        </div>
    )
}

export default CountryData