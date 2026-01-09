import type { Event } from '../types';

interface EventStatsProps {
  events: Event[];
}

const EventStats = ({ events }: EventStatsProps) => {
  const totalEvents = events.length;
  let totalParticipants = 0;
  for (let i = 0; i < events.length; i++) {
    totalParticipants += events[i].participants.length;
  }
  let upcoming = 0;
  for (let i = 0; i < events.length; i++) {
    if (events[i].status === 'upcoming') {
      upcoming++;
    }
  }

  return (
    <div className="stats">
      <div className="stat">
        <span className="stat__label">Événements</span>
        <span className="stat__value">{totalEvents}</span>
      </div>
      <div className="stat">
        <span className="stat__label">Participants</span>
        <span className="stat__value">{totalParticipants}</span>
      </div>
      <div className="stat">
        <span className="stat__label">Upcoming</span>
        <span className="stat__value">{upcoming}</span>
      </div>
    </div>
  );
};

export default EventStats;

