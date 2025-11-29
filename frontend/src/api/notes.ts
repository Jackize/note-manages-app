import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}

export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const response = await api.get<Note[]>('/notes');
    return response.data;
  },

  getById: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  create: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post<Note>('/notes', data);
    return response.data;
  },

  update: async (id: string, data: UpdateNoteData): Promise<Note> => {
    const response = await api.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

