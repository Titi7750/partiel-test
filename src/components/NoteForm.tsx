import React, { useState } from 'react';
import { useNoteStore } from '../store/noteStore';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [score, setScore] = useState<number>(0);
  const addNote = useNoteStore((state) => state.addNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }

    addNote(title, content, score);
    setTitle('');
    setContent('');
    setScore(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
      <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(Number(e.target.value))} required />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
