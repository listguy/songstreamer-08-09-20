import React from "react";
import SearchBar from "./SearchBar";
import UserMenu from "./components/UserMenu";
import { ImSpotify } from "react-icons/im";
import styled from "styled-components";
import { Link } from "react-router-dom";

const backgroundColor = "rgba(15,15,15,0.95)";

export default function TopMenu() {
  const TopMenu = styled.div`
    background-color: ${backgroundColor};
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    height: 10vh;
    width: 100%;
    margin-bottom: 4vh;
    z-index: 4;
    span {
      cursor: pointer;
      padding: 0.5vw;
    }
  `;

  const NavButtons = styled.div`
    span {
      margin: 0 1vh;
      font-size: 2.5vh;
      border-radius: 5px;
      &:hover {
        transition: 1s ease-in-out;
        background-color: rgba(230, 230, 230, 0.8);
        color: black;
      }
    }
  `;

  const HomeButton = styled.span`
    font-size: 6vh;
    margin: 0 10vw 0 1vw;
    color: white;
  `;

  return (
    <TopMenu>
      <HomeButton>
        <Link to="/">
          Sbotify <ImSpotify />
        </Link>
      </HomeButton>
      <NavButtons>
        <span>
          <Link to="/songs">Songs</Link>
        </span>
        <span>
          <Link to="/albums">Albums</Link>
        </span>
        <span>
          <Link to="/artists">Artists</Link>
        </span>
        <span>
          <Link to="/playlists">Playlists</Link>
        </span>
      </NavButtons>
      <SearchBar />
      <UserMenu backgroundColor={backgroundColor} />
    </TopMenu>
  );
}
