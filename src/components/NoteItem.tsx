import React from 'react';
import { useNoteStore } from '../store/noteStore';

interface NoteItemProps {
    note: {
        id: number;
        title: string;
        content: string;
        score: number;
        date: string;
    };
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
    const deleteNote = useNoteStore((state) => state.deleteNote);

    // const confirmDelete = (id: number) => {
    //     if (window.confirm('Voulez-vous vraiment supprimer cette note ?')) {
    //         deleteNote(id);
    //     }
    // };

    const getBackgroundColor = (score: number) => {
        if (score < 8) return 'red';
        if (score < 10) return 'orange';
        if (score < 13) return 'yellow';
        return 'green';
    };

    return (
        <div style={{ backgroundColor: getBackgroundColor(note.score) }}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 50)}...</p>
            <p>{note.score}/20</p>
            <p>{note.date}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
    );
};

export default NoteItem;
