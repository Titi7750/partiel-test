import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, expect, test } from 'vitest';
import App from '../../src/App';
import { useNoteStore } from '../../src/store/noteStore';

beforeEach(() => {
  // Réinitialiser l'état du store avant chaque test
  useNoteStore.setState({ notes: [] });
});

// Ce test vérifie qu'une note est ajoutée à la liste lorsqu'on remplit le formulaire et qu'on clique sur le bouton "Add Note"
test('It should add a new note and display it in the list', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Integration Test Note' } });
  fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Integration Test Content' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '12' } });

  fireEvent.click(screen.getByText('Add Note'));

  // Vérifier que la nouvelle note est affichée dans la liste
  expect(screen.getByText('Integration Test Note')).toBeTruthy();
  expect(screen.getByText('Integration Test Content...')).toBeTruthy();
});

// Ce test vérifie que la note est supprimée de la liste lorsqu'on clique sur le bouton "Delete"
test('It should delete a note from the list', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Integration Test Note' } });
  fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Integration Test Content' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '12' } });

  fireEvent.click(screen.getByText('Add Note'));

  // Vérifier que la nouvelle note est affichée dans la liste
  expect(screen.getByText('Integration Test Note')).toBeTruthy();

  fireEvent.click(screen.getByText('Delete'));

  // Vérifier que la note a été supprimée de la liste
  expect(screen.queryByText('Integration Test Note')).toBeNull();
});

// Ce test vérifie que la note n'est pas ajoutée si le titre est vide
test('It should not add a note if the title is empty', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Integration Test Content' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '12' } });

  fireEvent.click(screen.getByText('Add Note'));

  // Vérifier qu'aucune note n'a été ajoutée
  expect(screen.queryByText('Integration Test Content...')).toBeNull();
});

// Ce test vérifie que la note n'est pas ajoutée si le contenu est vide
test('It should not add a note if the content is empty', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Integration Test Note' } });
  fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '12' } });

  fireEvent.click(screen.getByText('Add Note'));

  // Vérifier qu'aucune note n'a été ajoutée
  expect(screen.queryByText('Integration Test Note')).toBeNull();
});