import { Link } from 'react-router-dom';
import EventFilters from '../components/EventFilters';
import EventList from '../components/EventList';
import EventStats from '../components/EventStats';
import ErrorBanner from '../components/ErrorBanner';
import Loader from '../components/Loader';
import { useEventsContext } from '../context/EventsContext';
import { useEventFilters } from '../hooks/useEventFilters';

const HomePage = () => {
  const { events, loading, error, removeEvent } = useEventsContext();
  const { search, status, setSearch, setStatus, filtered } = useEventFilters(events);

  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <h1>Événements</h1>
        </div>
        <Link to="/events/new" className="button">
          Ajouter un événement
        </Link>
      </div>

      <EventStats events={events} />
      <EventFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {loading && <Loader />}
      {error && <ErrorBanner message={error} />}
      {!loading && <EventList events={filtered} onDelete={removeEvent} />}
    </div>
  );
};

export default HomePage;

