import type { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList = ({ participants }: ParticipantListProps) => {
  if (participants.length === 0) {
    return <p className="muted">Aucun participant pour le moment.</p>;
  }

  return (
    <ul className="list">
      {participants.map((p) => (
        <li key={p.id} className="list__item">
          <div>
            <strong>{p.name}</strong>
            <p className="muted">{p.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantList;

