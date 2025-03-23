import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FilmList = styled.ul``;

const FilmItem = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

interface DetailInterface {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

const Detail = () => {
  const {id} = useParams();
  console.log(id);

  const fetchCharacterDetail = async () => {
    const res = await fetch(`https://disney_api.nomadcoders.workers.dev/characters/${id}`);
    return res.json();
  };
  const {
    data: characterData,
    isLoading,
    isError,
  } = useQuery<DetailInterface>({
    queryKey: ["characters", id],
    queryFn: fetchCharacterDetail,
  });

  if (isError) {
    return <div>Error loading characters</div>;
  }
  return (
    <Container>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Image src={characterData?.imageUrl} alt={characterData?.name} />
          <Name>{characterData?.name}'s films</Name>
          <FilmList>
            {characterData?.films?.map((film) => (
              <FilmItem key={film}>{film}</FilmItem>
            ))}
          </FilmList>
        </>
      )}
    </Container>
  );
};

export default Detail;
