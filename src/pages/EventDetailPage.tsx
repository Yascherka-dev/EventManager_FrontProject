import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorBanner from '../components/ErrorBanner';
import Loader from '../components/Loader';
import ParticipantForm from '../components/ParticipantForm';
import ParticipantList from '../components/ParticipantList';
import { useEventsContext } from '../context/EventsContext';
import { fetchEventById } from '../services/api';
import type { Event } from '../types';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, removeEvent, addParticipant } = useEventsContext();
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

  const handleDelete = async () => {
    const confirmed = window.confirm('Supprimer cet événement ?');
    if (!confirmed) return;
    await removeEvent(eventId);
    navigate('/');
  };

  const handleAddParticipant = async (payload: { name: string; email: string }) => {
    const updated = await addParticipant(eventId, payload);
    setEvent(updated);
  };

  if (loading) return <Loader />;
  if (error || !event) return <ErrorBanner message={error || 'Erreur'} />;

  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <h1>{event.title}</h1>
          <p className="muted">
            {new Date(event.date).toLocaleDateString()} · {event.location}
          </p>
        </div>
        <div className="row">
          <Link to={`/events/${event.id}/edit`} className="button button--ghost">
            Modifier
          </Link>
          <button className="button button--danger" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </div>

      <section className="card">
        <h2>Présentation</h2>
        <p>{event.description}</p>
      </section>

      <section className="grid">
        <div className="column">
          <h3>Participants</h3>
          <ParticipantList participants={event.participants} />
        </div>
        <div className="column">
          <h3>Inscrire un participant</h3>
          <ParticipantForm onSubmit={handleAddParticipant} />
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;

