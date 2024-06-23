import { beforeEach, expect, test } from 'vitest';
import { useNoteStore } from '../../src/store/noteStore';

beforeEach(() => {
  useNoteStore.setState({ notes: [] });
});

// Ce test ajoutera une note au store et vérifiera qu'elle a été ajoutée correctement
test('It should add a note to the store', () => {
    const { addNote } = useNoteStore.getState();
  
    addNote('Test Note', 'Test Content', 15);
  
    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
      title: 'Test Note',
      content: 'Test Content',
      score: 15
    });
});

// Ce test ajoutera une note au store, puis la supprimera et vérifiera qu'elle a été supprimée correctement
test('It should delete a note from the store', () => {
    const { addNote, deleteNote } = useNoteStore.getState();
    
    addNote('Test Note', 'Test Content', 15);
    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
  
    deleteNote(notes[0].id);
    expect(useNoteStore.getState().notes).toHaveLength(0);
});
