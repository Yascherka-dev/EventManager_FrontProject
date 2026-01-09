import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { useEventsContext } from '../context/EventsContext';

const EventCreatePage = () => {
  const { addEvent } = useEventsContext();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    await addEvent({ ...values, participants: [] });
    navigate('/');
  };

  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <h1>Nouvel événement</h1>
        </div>
      </div>
      <EventForm submitLabel="Créer" onSubmit={handleSubmit} />
    </div>
  );
};

export default EventCreatePage;

