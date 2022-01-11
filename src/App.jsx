import { useEffect, useState } from 'react'
import './App.css'
import Image from './components/image'

function App() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/images`)
      .then(resp => resp.json())
      .then(imagesFromServer => setImages(imagesFromServer))
  }, [])

  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />

      <section className="image-container">

        {images.map(image => (
          <Image
            key={image.id}
            image={image}
          />
        ))}

      </section>
    </div>
  )
}

export default App
