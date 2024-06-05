import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import NoteList from '../../src/components/NoteList';
import { useNoteStore } from '../../src/store/noteStore';

// Ce test vérifie que le composant NoteList affiche bien une liste vide
test('It should render an empty list initially', () => {
  useNoteStore.setState({ notes: [] });

  render(<NoteList />);

  expect(screen.queryByText(/Note/)).toBeNull();
});

// Ce test vérifie que le composant NoteList affiche bien une liste de notes
test('It should render a list of notes', () => {
  useNoteStore.setState({
    notes: [
      { id: 1, title: 'Test Note 1', content: 'Test Content 1', score: 15, date: '2024-06-05' },
      { id: 2, title: 'Test Note 2', content: 'Test Content 2', score: 10, date: '2024-06-05' }
    ]
  });

  render(<NoteList />);

  expect(screen.getByText('Test Note 1')).toBeTruthy();
  expect(screen.getByText('Test Note 2')).toBeTruthy();
});
