import { useEffect, useState } from 'react'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY

const useFetch = ({ keyword }) => {
  const [giphyUrl, setGiphyUrl] = useState('')

  useEffect(() => {
    if (keyword) fetchGiphy()
  }, [keyword])

  const fetchGiphy = async () => {
    try {
      console.log(`Fetching giphy... with api key ${API_KEY}`)
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key${API_KEY}&q=${keyword}
          .split(' ')
          .join('')&limit=1`
      )
      const { data } = await response.json()

      setGiphyUrl(data[0]?.images?.downsized_medium?.url)
    } catch (error) {
      console.log(`Error upon fetching giphy with api key: ${API_KEY}`)
      setGiphyUrl(
        'https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif'
      )
    }
  }
  return giphyUrl
}

export default useFetch
