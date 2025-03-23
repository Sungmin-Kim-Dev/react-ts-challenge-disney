import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const Name = styled.p`
  font-size: 1rem;
  margin: 0;
`;
interface CharacterInterface {
  id: number;
  name: string;
  imageUrl: string;
}

const Home = () => {
  const fetchCharacterList = async () => {
    const res = await fetch("https://disney_api.nomadcoders.workers.dev/characters");
    return res.json();
  };
  const {
    data: characterList,
    isLoading,
    isError,
  } = useQuery<CharacterInterface[]>({
    queryKey: ["charactersList"],
    queryFn: fetchCharacterList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading characters</div>;
  }

  return (
    <Container>
      <Title>Disney Characters</Title>
      <ItemContainer>
        {characterList?.map((character) => (
          <Link to={`/character/${character.id}`} key={character.id}>
            <ItemBox>
              <Image src={character.imageUrl} alt={character.name} />
              <Name>{character.name}</Name>
            </ItemBox>
          </Link>
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Home;
