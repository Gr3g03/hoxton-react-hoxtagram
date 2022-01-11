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
    return fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageId: imageId,
        content: content
      })
    }).then(resp => resp.json())
      .then((newComment) => {
        const updatedComment = JSON.parse(JSON.stringify(images))
        const match = updatedComment.find((target) => target.id === imageId)
        match.comments.push(newComment)
        setImages(updatedComment)
      })

  }

  function deleteComment(comment) {
    return fetch(`http://localhost:3000/comments/${comment.id}`, {
      method: "DELETE"
    }).then(() => {

      const updatedImage = JSON.parse(JSON.stringify(images))
      const match = updatedImage.find((targetImage) => targetImage.id === comment.imageId)
      match.comments = match.comments.filter(targetComment => targetComment.id !== comment.id)
      setImages(updatedImage)
    })
  }

  function deletePost(image) {
    return fetch(`http://localhost:3000/comments/${image.id}`, {
      method: "DELETE"
    }).then(() => {

      const updatedImage = JSON.parse(JSON.stringify(images))
      const match = updatedImage.find((targetImage) => targetImage.id === image.imageId)
      match.comments = match.comments.filter(targetComment => targetComment.id !== image.id)
      setImages(updatedImage)
    })
  }

  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />

      <div>
        <h2>Add an image</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log('title: ', e.target.title.value)
            console.log('url:', e.target.url.value)
            e.target.reset()
          }}
        >
          <input type='text' placeholder='title' name='title' />
          <input type='text' placeholder='url' name='url' />
          <button>ADD IMAGE</button>
        </form>
      </div>

      <section className="image-container">

        {images.map(image => (
          <Image
            key={image.id}
            image={image}
            getLikes={getLikes}
            createComment={createComment}
            deleteComment={deleteComment}
          />
        ))}

      </section>
    </div>
  )
}

export default App
