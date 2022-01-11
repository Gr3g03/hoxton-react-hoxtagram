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

  function deletePost(image) {
    return fetch(`http://localhost:3000/images/${image.id}`, {
      method: "DELETE"
    }).then(() => {

      const updatedImage = JSON.parse(JSON.stringify(images))
      const match = updatedImage.find((targetImage) => targetImage.id === image.id)
      match.comments = match.comments.filter(targetPost => targetPost.id !== image.id)
      setImages(updatedImage)
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

  function addNewPost(image, title) {
    fetch(`http://localhost:3000/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        image: image,
        title: title
      })
    }).then(resp => resp.json())
      .then((newpost) => {
        let updateImages = JSON.parse(JSON.stringify(images));
        updateImages.push({
          id: newpost.id,
          image: image,
          title: title,
          likes: 0,
          comments: []
        });
        setImages(updateImages);
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
            const img = e.target.url.value
            const titleEL = e.target.title.value
            addNewPost(img, titleEL)
            e.target.reset();
          }}
        // }}
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
            deletePost={deletePost}
          />
        ))}

      </section>
    </div>
  )
}

export default App
