import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotesPage } from './pages/NotesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
