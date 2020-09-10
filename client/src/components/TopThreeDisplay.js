import React, { useState, useEffect } from "react";
import getFromDB from "./wrapper.js";
import Thumbnail from "./Thumbnail";
import "../styles/TopThreeDisplay.css";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlbum } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";

export default function TopThreeDisplay(props) {
  const [data, setData] = useState();
  const { type } = props;
  const icons = {
    songs: <IoMdMusicalNote />,
    albums: <MdAlbum />,
    artists: <GiMicrophone />,
  };

  useEffect(() => {
    getFromDB(`/top_${type}`).then((result) => {
      setData(result);
    });
  }, []);

  console.log(data);

  return data ? (
    <>
      <span className="category">
        Top 3 {type} {icons[type]}
      </span>
      <div className="top-three-display">
        {data.map((obj, i) => (
          <Thumbnail data={obj} type={type} rank={i + 1} />
        ))}
      </div>
    </>
  ) : null;
}
