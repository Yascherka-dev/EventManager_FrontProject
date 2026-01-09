import type { Event } from '../types';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  onDelete: (id: number) => void;
}

const EventList = ({ events, onDelete }: EventListProps) => {
  if (events.length === 0) {
    return <p className="muted">Aucun événement ne correspond à la recherche.</p>;
  }

  return (
    <div className="stack">
      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EventList;

