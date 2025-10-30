import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../slices/postsSlice';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await dispatch(createPost(text)).unwrap();
      setText(''); // clear input
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 max-w-2xl mx-auto p-4 border rounded"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border h-24"
      />
      <div className="flex justify-end mt-2">
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
}
