import { createContext, useContext, useEffect, useState } from 'react';
import type { Event } from '../types';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerParticipant,
} from '../services/api';

interface EventsContextValue {
  events: Event[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addEvent: (payload: any) => Promise<void>;
  editEvent: (id: number, payload: any) => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
  addParticipant: (eventId: number, participant: any) => Promise<Event>;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
      setError(null);
    } catch (err: any) {
      setError('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = async (payload: any) => {
    try {
      const created = await createEvent(payload);
      setEvents((prev) => [...prev, created]);
      setError(null);
    } catch (err: any) {
      setError('Erreur');
      throw err;
    }
  };

  const editEvent = async (id: number, payload: any) => {
    try {
      const updated = await updateEvent(id, payload);
      setEvents((prev) => prev.map((evt) => (evt.id === id ? updated : evt)));
      setError(null);
    } catch (err: any) {
      setError('Erreur');
      throw err;
    }
  };

  const removeEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((evt) => evt.id !== id));
      setError(null);
    } catch (err: any) {
      setError('Erreur');
      throw err;
    }
  };

  const addParticipant = async (
    eventId: number,
    participant: { name: string; email: string }
  ): Promise<Event> => {
    try {
      const updated = await registerParticipant(eventId, participant);
      setEvents((prev) => prev.map((evt) => (evt.id === eventId ? updated : evt)));
      setError(null);
      return updated;
    } catch (err: any) {
      setError('Erreur');
      throw err;
    }
  };

  const value: EventsContextValue = {
    events,
    loading,
    error,
    refresh: loadEvents,
    addEvent,
    editEvent,
    removeEvent,
    addParticipant,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEventsContext = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('Erreur');
  return ctx;
};

