import axios from 'axios';
import type { Event } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const { data } = await api.get<Event[]>('/events');
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

export const fetchEventById = async (id: number): Promise<Event> => {
  try {
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

export const createEvent = async (payload: any): Promise<Event> => {
  try {
    const { data } = await api.post<Event>('/events', payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

export const updateEvent = async (id: number, payload: any): Promise<Event> => {
  try {
    const { data } = await api.patch<Event>(`/events/${id}`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await api.delete(`/events/${id}`);
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

export const registerParticipant = async (
  eventId: number,
  participant: any
): Promise<Event> => {
  try {
    const event = await fetchEventById(eventId);
    let nextId = 1;
    if (event.participants.length > 0) {
      nextId = Math.max(...event.participants.map((p: any) => p.id)) + 1;
    }
    const updatedParticipants = [...event.participants, { ...participant, id: nextId }];
    const updatedEvent = await updateEvent(eventId, { participants: updatedParticipants });
    return updatedEvent;
  } catch (error: any) {
    throw new Error(error.message || 'Erreur');
  }
};

