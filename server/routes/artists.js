const express = require("express");
const { Song, Album, Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit, order = "ASC" } = Number(req.query) || 10000000;

  const allArtists = await Artist.findAll({
    limit: limit,
    order: [["title", order]],
    //{ model: Album, include: Song } to include all songs of album, use this
  });
  res.json(allArtists);
});

router.get("/top", async (req, res) => {
  const { limit } = Number(req.query) || 10000000;

  const topArtists = await Artist.findAll({
    limit: limit,
    //{ model: Album, include: Song } to include all songs of album, use this
  });

  const songs = await Artist.findAll({
    include: [{ model: Song, attributes: ["views"] }],
    attributes: ["id"],
    limit: limit,
  });

  let combined = [];
  for (let i = 0; i < songs.length; i++) {
    let counterViews = 0;
    songs[i].toJSON().Songs.forEach((obj) => (counterViews += obj.views));
    topArtists[i].dataValues.views = counterViews;
    combined.push(topArtists[i]);
  }
  combined = combined.sort((a, b) => {
    return a.toJSON().views - b.toJSON().views;
  });
  res.json(combined.reverse());
});

router.get("/:id", async (req, res) => {
  const { limitSongs } = req.query || 100000;

  const artist = await Artist.findByPk(req.params.id, {
    include: [
      { model: Album, attributes: ["id", "title", "media", "created_at"] },
      {
        model: Song,
        include: { model: Album, attributes: ["title"] },
        attributes: ["id", "title", "length", "media", "views"],
        limit: Number(limitSongs),
      },
    ],
  });
  res.json(artist);
});

//need to improve below methods, so child are affected too.
router.post("/", async (req, res) => {
  let body = Array.isArray(req.body) ? req.body : [req.body];
  body = body.map((artist) => {
    artist.uploadedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    return artist;
  });

  try {
    const newArtists = await Artist.bulkCreate(body, {
      fields: ["title", "media", "uploadedAt"],
    });

    res.json(newArtists);
  } catch (e) {
    res.status(400).send({ msg: "Malformed data" });
  }
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedArtist = await Artist.update(fields, {
    where: {
      id: req.params.id,
    },
    fields: ["title", "media"],
  });
  res.json({ sucsess: updatedArtist[0] === 1 });
});

router.delete("/:id", async (req, res) => {
  await Artist.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

router.delete("/:id/hardDelete", async (req, res) => {
  await Artist.destroy({
    where: {
      id: req.params.id,
    },
    force: true,
  });

  res.send("Deleted permanatly");
});

module.exports = router;
