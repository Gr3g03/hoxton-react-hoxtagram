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

  function getLikes(image) {
    fetch(`http://localhost:3000/images/${image.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: image.likes + 1 })
    })

    const updatedState = JSON.parse(JSON.stringify(images))
    const match = updatedState.find(target => target.id === image.id)
    match.likes++

    setImages(updatedState)
  }

  function createComment(imageId, content) {
    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageId: imageId,
        content: content
      })
    })

    const updatedComments = JSON.parse(JSON.stringify(images))
    const match = updatedComments.find(target => target === imageId)

    setImages(updatedComments)
  }

  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />

      <section className="image-container">

        {images.map(image => (
          <Image
            key={image.id}
            image={image}
            getLikes={getLikes}
            createComment={createComment}
          />
        ))}

      </section>
    </div>
  )
}

export default App
