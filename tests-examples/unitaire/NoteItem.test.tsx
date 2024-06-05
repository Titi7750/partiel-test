import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, expect, test } from 'vitest';
import NoteItem from '../../src/components/NoteItem';
import { useNoteStore } from '../../src/store/noteStore';

const note = { id: 1, title: 'Test Note', content: 'Test Content', score: 15, date: '2024-06-05' };

beforeEach(() => {
  // Réinitialiser l'état du store avant chaque test
  useNoteStore.setState({ notes: [] });
});

afterEach (() => {
  // Nettoyer le DOM après chaque test
  cleanup();
});

// Ce test vérifie que le composant NoteItem rend bien les détails d'une note
test('It should render note details', () => {
  render(<NoteItem note={note} />);

  expect(screen.getByText('Test Note')).toBeTruthy();
  expect(screen.getByText('2024-06-05')).toBeTruthy();
  expect(screen.getByText('Test Content...')).toBeTruthy();
});

// Ce test vérifie que le composant NoteItem supprime une note lorsqu'on clique sur le bouton "Delete"
test('It should delete a note', () => {
  // Ajouter une note au store
  useNoteStore.setState({ notes: [note] });

  render(<NoteItem note={note} />);

  // Vérifier que la note est rendue
  expect(screen.getByText('Test Note')).toBeTruthy();

  // Cliquer sur le bouton "Delete"
  fireEvent.click(screen.getByText('Delete'));

  // Vérifier que la note a été supprimée du store
  const actual = useNoteStore.getState().notes;
  const expected = [];
  expect(actual).toEqual(expected);
});

// Ce test vérifie que la couleur de fond du composant NoteItem est correcte en fonction de la note
test('It should set the correct background color', () => {
  render(<NoteItem note={note} />);

  const noteElement = screen.getByText('Test Note').parentElement;
  const styles = getComputedStyle(noteElement!);

  // Comparer avec la valeur RGB de 'green'
  expect(styles.backgroundColor).toBe('rgb(0, 128, 0)');
});

// Ce test vérifie que la couleur des fonds du composant NoteItem est correcte en fonction des notes
test('It should set the correct background color for different scores', () => {
  const notes = [
    { ...note, score: 5 },
    { ...note, score: 9 },
    { ...note, score: 12 },
    { ...note, score: 16 },
  ];

  notes.forEach((note) => {
    render(<NoteItem note={note} />);

    const noteElement = screen.getByText('Test Note').parentElement;
    const styles = getComputedStyle(noteElement!);

    switch (note.score) {
      case 5:
        expect(styles.backgroundColor).toBe('rgb(255, 0, 0)'); // red
        break;
      case 9:
        expect(styles.backgroundColor).toBe('rgb(255, 165, 0)'); // orange
        break;
      case 12:
        expect(styles.backgroundColor).toBe('rgb(255, 255, 0)'); // yellow
        break;
      case 16:
        expect(styles.backgroundColor).toBe('rgb(0, 128, 0)'); // green
        break;
    }

    cleanup();
  });
});
