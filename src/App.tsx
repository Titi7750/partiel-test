import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Gestionnaire de Notes</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
};

export default App;
