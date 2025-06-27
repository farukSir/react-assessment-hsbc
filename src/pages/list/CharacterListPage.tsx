import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { fetchCharacters } from "../../api/character";
import { CharacterTable } from "../../components/CharacterTable";
import { CharacterApiResponse } from "./CharacterList.types";

const CharacterListPage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "__root__" });
  const page = Number(search.page || 1);

  const { data, isLoading, isError, refetch } = useQuery<CharacterApiResponse>({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (previousData) => previousData,
  });

  const handleNavigate = (id: number) => {
    navigate({ to: "/character/$id", params: { id: String(id) } });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <h1>Rick & Morty Characters</h1>
      <div className="button-group">
      <button className="btn btn-refresh" onClick={handleRefresh}>Refresh</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading characters.</p>}

      {data && (
        <>
          <CharacterTable data={data.results} onRowClick={handleNavigate}/>
          <div className="button-group">
            <button
            className="btn btn-nav"
              disabled={page === 1}
              onClick={() => navigate({ search: () => ({ page: page - 1 }) })}
            >
              Prev
            </button>
            <span> Page {page} </span>
            <button
             className="btn btn-nav"
              disabled={!data.info.next}
              onClick={() => navigate({ search: () => ({ page: page + 1 }) })}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterListPage;
