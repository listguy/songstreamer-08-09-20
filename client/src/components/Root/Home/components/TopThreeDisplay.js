import React, { useState, useEffect } from "react";
import { getAllBy, getFromDB } from "../../wrapper.js";
import Thumbnail from "./Thumbnail";
import Carousela from "../../components/Carousela";
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
    getFromDB(`/top/${type}?limit=7`).then(async (results) => {
      results = await Promise.all(
        results.map((item) =>
          getAllBy("artists", "artist", item.artist_id).then((artist) => {
            item.artist = artist[0].title;
            return item;
          })
        )
      );
      setData(results);
    });
  }, []);

  // console.log(data);
  return data ? (
    <div className="top-three-display">
      <span className="category">
        Top {type} {icons[type]}
      </span>
      <Carousela Template={Thumbnail} data={data} count={5} step={1} />
    </div>
  ) : null;
}

// return data ? (
//   <>
//     <span className="category">
//       Top 4 {type} {icons[type]}
//     </span>
//     <div className="top-three-display">
//       {data.map((obj, i) => (
//         <Thumbnail data={obj} type={type.slice(0, -1)} rank={i + 1} />
//       ))}
//     </div>
//   </>
// ) : null;

// Trying to make carousle