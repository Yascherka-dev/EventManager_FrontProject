import type { EventStatus } from '../types';

interface EventFiltersProps {
  search: string;
  status: EventStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: EventStatus | 'all') => void;
}

const EventFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: EventFiltersProps) => {
  return (
    <div className="card">
      <div className="field">
        <label htmlFor="search">Rechercher</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as EventStatus | 'all')}
        >
          <option value="all">Tous</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default EventFilters;

