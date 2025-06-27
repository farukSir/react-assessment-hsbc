import {  useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../api/character';

export const CharacterDetailPage = () => {
  const state = useLocation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', state.pathname],
    queryFn: () => fetchCharacterById(state.pathname),
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error fetching character.</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>
      <p>Location: {data.location.name}</p>
    </div>
  );
};