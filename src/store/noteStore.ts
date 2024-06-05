import { create } from 'zustand';

interface Note {
  id: number;
  title: string;
  content: string;
  score: number;
  date: string;
}

interface NoteStore {
  notes: Note[];
  addNote: (title: string, content: string, score: number) => void;
  deleteNote: (id: number) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: (title, content, score) => set((state) => ({
    notes: [
      ...state.notes,
      { id: Date.now(), title, content, score, date: new Date().toLocaleDateString() }
    ]
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  }))
}));
