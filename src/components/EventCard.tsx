import { Link } from 'react-router-dom';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
  onDelete: (id: number) => void;
}

const EventCard = ({ event, onDelete }: EventCardProps) => {
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('fr-FR');

  const getStatusLabel = (status: string) => {
    if (status === 'upcoming') return 'Upcoming';
    if (status === 'ongoing') return 'Ongoing';
    if (status === 'completed') return 'Completed';
    return status;
  };

  return (
    <article className="card card--row">
      <div className="card__content">
        <div className="card__header">
          <h3>{event.title}</h3>
          <span className={`badge badge--${event.status}`}>{getStatusLabel(event.status)}</span>
        </div>
        <p className="muted">
          {formattedDate} · {event.location}
        </p>
        <p className="muted">
          Participants inscrits : <strong>{event.participants.length}</strong>
        </p>
      </div>
      <div className="card__actions">
        <Link to={`/events/${event.id}`} className="button">
          Détails
        </Link>
        <Link to={`/events/${event.id}/edit`} className="button button--ghost">
          Modifier
        </Link>
        <button
          className="button button--danger"
          onClick={() => {
            const confirmed = window.confirm(
              `Confirmer la suppression de "${event.title}" ?`
            );
            if (confirmed) onDelete(event.id);
          }}
        >
          Supprimer
        </button>
      </div>
    </article>
  );
};

export default EventCard;

