import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';
import ErrorBanner from '../components/ErrorBanner';
import Loader from '../components/Loader';
import { useEventsContext } from '../context/EventsContext';
import { fetchEventById } from '../services/api';
import type { Event } from '../types';

const EventEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, editEvent } = useEventsContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventId = id ? Number(id) : 0;

  useEffect(() => {
    const existing = events.find((evt) => evt.id === eventId);
    if (existing) {
      setEvent(existing);
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const data = await fetchEventById(eventId);
        setEvent(data);
      } catch (err: any) {
        setError('Erreur');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [eventId, events]);

  const handleSubmit = async (values: any) => {
    await editEvent(eventId, values);
    navigate(`/events/${eventId}`);
  };

  if (loading) return <Loader />;
  if (error || !event) return <ErrorBanner message={error || 'Erreur'} />;

  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <h1>Modifier l&apos;événement</h1>
        </div>
      </div>
      <EventForm initial={event} submitLabel="Enregistrer" onSubmit={handleSubmit} />
    </div>
  );
};

export default EventEditPage;

