import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import NoteForm from '../../src/components/NoteForm';
import { useNoteStore } from '../../src/store/noteStore';

// Ce test vérifie que le composant NoteForm rend bien les champs de formulaire
test('It should render the form fields', () => {
  render(<NoteForm />);

  expect(screen.getByPlaceholderText('Title')).toBeTruthy();
  expect(screen.getByPlaceholderText('Content')).toBeTruthy();
  expect(screen.getByPlaceholderText('Score')).toBeTruthy();
});

// Ce test vérifie que le composant NoteForm ajoute bien une nouvelle note
test('It should add a new note', () => {
  render(<NoteForm />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Note' } });
  fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Test Content' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '15' } });

  fireEvent.click(screen.getByText('Add Note'));

  const actual = useNoteStore.getState().notes;
  const expected = [
    { id: actual[0].id, title: 'Test Note', content: 'Test Content', score: 15, date: actual[0].date },
  ];
  expect(actual).toEqual(expected);
});

// Ce test vérifie que le composant NoteForm vide bien le formulaire après avoir ajouté une note
test('It should clear the form after adding a note', () => {
  render(<NoteForm />);

  fireEvent.change(screen.getByPlaceholderText('Title') as HTMLInputElement, { target: { value: 'Test Note' } });
  fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Test Content' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '15' } });

  fireEvent.click(screen.getByText('Add Note'));

  expect((screen.getByPlaceholderText('Title') as HTMLInputElement).value).toBe('');
  expect((screen.getByPlaceholderText('Content') as HTMLInputElement).value).toBe('');
  // expect((screen.getByPlaceholderText('Score') as HTMLInputElement).value).toBe(0);
});
