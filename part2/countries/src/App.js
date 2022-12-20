import axios from 'axios'
import { useState, useEffect } from 'react'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    let val = event.target.value
    setFilter(val)
    setCountriesToShow(countries.filter(country => country.name.toLowerCase().includes(val.toLowerCase())))
  }

  return (
    <div>
      find countries <input text={filter} onChange={handleFilter}/>
      <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
    </div>
  );
}

export default App;
