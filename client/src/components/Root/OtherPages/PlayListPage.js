import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getFromDB } from "../wrapper";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import SongList from "./components/SongList";
import styled from "styled-components";

export default function PlayListPage() {
  const [data, setData] = useState();
  const [showMoreWidg, setShowMore] = useState(false);
  const path = useLocation().pathname;

  useEffect(() => {
    fetchData(path);
  }, []);

  const fetchData = async (path) => {
    const res = (await getFromDB(path))[0];
    console.log(res);
    setData(res);
  };

  const MoreArtists = styled.div``;

  const Container = styled.div`
    width: 80vw;
    margin: 0 6vw;
  `;

  const TopStrip = styled.div`
    background-image: url(${"https://i.pinimg.com/originals/ba/21/2d/ba212df02c04a648597bedf6dd43fba2.jpg"});
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 40vh;
    padding-left: 3vw;
    padding-bottom: 2vh;
  `;

  const Header = styled.h1`
    font-size: 8vh;
    margin-bottom: 0.5vh;
    text-shadow: 2px 2px 4px #000000;
  `;

  const Type = styled.span`
    font-size: 3vh;
    text-shadow: 2px 2px 4px #000000;
    font-style: italic;
  `;

  const ArtistStrip = styled.div`
    display: flex;
    align-items: flex-end;
    width: fit-content;
    margin-left: 3vw;
  `;

  const Button = styled.span`
    margin-left: 1vw;
    &:hover {
      cursor: pointer;
      filter: brightness(1.3);
    }
  `;
  return data ? (
    <Container id="pl-container">
      <TopStrip id="pl-top">
        <div id="pl-details">
          <Header>{data.title}</Header>
          <Type id="pl-type">Playlist</Type>
        </div>
        <ArtistStrip id="pl-artists">
          {data.artists.slice(0, 3).map((a) => (
            <ArtistCircleWidg title={a[0]} pic={a[1]} id={a[2]} />
          ))}
          {showMoreWidg && (
            <MoreArtists>
              {data.artists.slice(3).map((a) => (
                <ArtistCircleWidg title={""} pic={a[1]} id={a[2]} />
              ))}
            </MoreArtists>
          )}
          {data.artists[3] && (
            <Button
              onClick={() => setShowMore(!showMoreWidg)}
              style={{ marginLeft: "1vw" }}
            >
              {showMoreWidg ? "Show Less" : "Show More"}
            </Button>
          )}
        </ArtistStrip>
      </TopStrip>
      <div id="ar-sl">
        {
          <SongList
            songs={data.songs}
            border={true}
            options={["album_name", "artist_name"]}
          />
        }
      </div>
    </Container>
  ) : null;
}
