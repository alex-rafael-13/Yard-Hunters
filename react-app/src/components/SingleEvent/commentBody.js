import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DeleteComment from "./deleteComment"
import OpenModalButton from "../OpenModalButton"
import EditComment from "./editComment"


export default function CommentBody({ comments }) {
    const [isLoaded, setLoaded] = useState(false)
    const [editing, setEditing] = useState(false)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        setLoaded(true)
    }, [comments])

    return (
        <>
            {isLoaded &&
                <>
                    {comments.map(comment => (
                        <div key={comment.id} className="comment-card">
                            <div className="comment-user-date">
                                <div className="commentor">{comment.user['username']}</div>
                                <div className="comment-date">{comment.date_created}</div>
                            </div>
                            <div>{comment.comment_body}</div>
                            {user.id === comment.user.id && !editing &&
                                <div className="comment-buttons">
                                    <OpenModalButton
                                        buttonText='Edit'
                                        modalComponent={<EditComment comment={comment}/>}
                                    />
                                    <OpenModalButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteComment commentId={comment.id}/>}
                                    />
                                </div>
                            }
                        </div>
                    ))}
                </>
            }
        </>
    )
}