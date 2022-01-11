export default function Image(props) {
    return (
        <article className="image-card">
            <h2 className="title" >{props.image.title}</h2>
            <img src={props.image.image} className="image" />
            <div className="likes-section">
                <span className="likes">{props.image.likes}</span>
                <button className="like-button" onClick={() => {
                    props.getLikes(props.image)
                }}>♥</button>
            </div>
            <ul className="comments">
                {props.image.comments.map(comment =>
                    <li key={comment.id}>{comment.content}</li>)}
            </ul>
        </article>
    )
}