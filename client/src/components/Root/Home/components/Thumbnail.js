import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaEye } from "react-icons/fa";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const { data, rank, options } = props;
  let media;
  const type = options.type;

  if (data && data.media !== "") {
    media =
      type === "songs"
        ? `https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`
        : data.media;
  }

  return data ? (
    <div
      className="thumbnail"
      style={type === "artist" ? { backgroundColor: "unset" } : null}
    >
      <span className="rank">{rank}</span>
      <div className="thumb-img">
        <div class="overlay-options">
          {type === "song" ? <FaPlay /> : <FaEye />}
        </div>
        <Link to={`/${type}/${data.id}`}>
          {data.media !== "" && (
            <img
              src={media}
              style={type === "artist" ? { borderRadius: "50%" } : null}
            />
          )}
        </Link>
      </div>
      <>
        <span className="title">{data.title}</span>
        {data.Artist ? (
          <Link to={`/artists/${data.Artist.id}`}>
            <span className="artist-link">{data.Artist.title}</span>
          </Link>
        ) : null}
      </>
    </div>
  ) : null;
}
