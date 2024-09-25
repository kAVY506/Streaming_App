import React, { useState } from 'react';
import axios from '../api';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    const response = await axios.get(`/videos/${videoId}/comments`);
    setComments(response.data);
  };

  const postComment = async (e) => {
    e.preventDefault();
    await axios.post(`/videos/${videoId}/comments`, { comment });
    setComment('');
    fetchComments();
  };

  return (
    <div>
      <form onSubmit={postComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
