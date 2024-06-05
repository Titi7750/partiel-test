import React from 'react';
import { useNoteStore } from '../store/noteStore';
import NoteItem from './NoteItem';

const NoteList: React.FC = () => {
  const notes = useNoteStore((state) => state.notes);

  return (
    <div>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
