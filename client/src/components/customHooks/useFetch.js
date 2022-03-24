import { useEffect, useState } from 'react'

const { REACT_APP_GIPHY_API } = process.env

const useFetch = ({ keyword }) => {
  const [giphyUrl, setGiphyUrl] = useState('')

  useEffect(() => {
    if (keyword) fetchGiphy()
  }, [keyword])

  const fetchGiphy = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${REACT_APP_GIPHY_API}&q=${keyword
          .split(' ')
          .join('')}&limit=1`
      )

      const { data } = await response.json()

      setGiphyUrl(data[0]?.images?.downsized_medium?.url)
      
    } catch (error) {
      console.log('Error in gif api retreival: ', error)
      setGiphyUrl(
        'https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif'
      )
    }
  }
  return giphyUrl
}

export default useFetch
