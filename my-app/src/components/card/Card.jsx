import "./Card.css"
import React from 'react'


export default function Card({post}) {
  return (
    <div key={post.id} className="post">
    <h2>{post?.title}</h2>
    <p>{post?.body}</p>
    </div>
  )
}
