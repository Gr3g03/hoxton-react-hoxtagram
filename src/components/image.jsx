export default function Image(props) {
    return (
        <article className="image-card">
            <h2 className="title" >{props.image.title}</h2>
            <img src={props.image.image} className="image" />
            <button onClick={() => {
            }} >x</button>
            <div className="likes-section">
                <span className="likes">{props.image.likes}</span>
                <button className="like-button" onClick={() => {
                    props.getLikes(props.image)
                }}>♥</button>
            </div>
            <ul className="comments">
                {props.image.comments.map(comment =>
                    <li key={comment.id}>{comment.content}
                        <button className="delete-button"
                            onClick={() => {
                                props.deleteComment(comment)
                            }}
                        >X</button>
                    </li>)}
                <form className="comment-form" onSubmit={function (e) {
                    e.preventDefault()
                    const content = e.target.comment.value
                    props.createComment(props.image.id, content)
                    e.target.reset()

                }}>
                    <input type="text"
                        name="comment"
                        className="comment-input"
                        placeholder="Add a comment"
                    />
                    <button className="comment-button" type="submit">ADD</button>
                </form>

            </ul>
        </article >
    )
}