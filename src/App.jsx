import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isActive, setIsActive] = useState(true);
  const [sortedBy, setSortedBy] = useState('now_playing')
  const movieUri = `https://api.themoviedb.org/3/movie/${sortedBy}?api_key=6916b5833979b9f679193d591cd740a7`

  const fetchMovie = async () => {
    await axios.get(`${movieUri}`)
      .then(res => setData(res.data.results))
      .catch(err => console.error(err))
    setLoading(false)
  }

  switch (sortedBy) {
    case '0':
      data.sort((a, b) => b.vote_average - a.vote_average)
      break;
    case '1':
      data.sort((a, b) => a.vote_average - b.vote_average)
      break;
    default:
      data.sort((a, b) => a.id - b.id)
      break;
  }

  useEffect(() => {
    fetchMovie()
    console.log(data)
  }, [sortedBy])

  return (
    <div className="main">

      <div className="title">
        <h3>Movie DB</h3>
      </div>

      <div className="container">
        <div>
          <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
              <h4>Sort</h4>
              <div>{isActive ? '-' : '+'}</div>
            </div>

            {isActive &&
              <div className="accordion-content">
                <p>Sort result by</p>
                <select onChange={e => setSortedBy(e.target.value)}>
                  <option value="now_playing">Now Playing</option>
                  <option value="popular">Popular</option>
                  <option value="top_rated">Top Rated</option>
                  <option value="upcoming">Upcoming</option>
                </select>

                <p>Ascending / Descending</p>
                <select onChange={e => setSortedBy(e.target.value)}>
                  <option value="-">Default</option>
                  <option value="1">Ascending</option>
                  <option value="0">Descending</option>
                </select>
              </div>
            }
          </div>
        </div>

        <div className="d-grid">
          {loading && <h4>Loading...</h4>}
          {data?.map((e) => <Card key={e.id} {...e} />)}
        </div>

      </div>

    </div>
  )
}

export default App

const Card = ({ poster_path, release_date, vote_average, title }) => {
  return (
    <div className="card">
      <div className="">
        <img style={{ width: '100%', height: '15rem' }} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="image" />
      </div>
      <div className="body">
        <div className="rating">
          <div>
            {vote_average * 10}<span>%</span>
          </div>
        </div>
        <h5>
          {title}
        </h5>
        <div className="date">
          {moment(release_date).format("MMM Do YY")}
        </div>
      </div>
    </div>
  )
}