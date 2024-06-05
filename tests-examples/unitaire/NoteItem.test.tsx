import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, expect, test } from 'vitest';
import NoteItem from '../../src/components/NoteItem';
import { useNoteStore } from '../../src/store/noteStore';

const note = { id: 1, title: 'Test Note', content: 'Test Content', score: 15, date: '2024-06-05' };

beforeEach(() => {
  // Réinitialiser l'état du store avant chaque test
  useNoteStore.setState({ notes: [] });
});

// Ce test vérifie que le composant NoteItem rend bien les détails d'une note
test('It should render note details', () => {
  render(<NoteItem note={note} />);

  expect(screen.getByText('Test Note')).toBeTruthy();
  expect(screen.getByText('2024-06-05')).toBeTruthy();
  expect(screen.getByText('Test Content...')).toBeTruthy();
});

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
