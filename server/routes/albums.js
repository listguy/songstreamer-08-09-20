const express = require("express");
const { Song, Album, Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit, order = "ASC" } = Number(req.query) || 1000000;

  const allAlbums = await Album.findAll({
    limit: limit,
    include: [{ model: Artist, attributes: ["id", "title"] }],
    order: [["title", order]],
  });

  res.json(allAlbums);
});

router.get("/top", async (req, res) => {
  const limit = Number(req.query.limit) || 100000;
  const topAlbums = await Album.findAll({
    limit: limit,
    include: [
      {
        model: Artist,
        attributes: ["title"],
      },
    ],
    attributes: ["id", "title", "media"],
  });

  const songs = await Album.findAll({
    include: [{ model: Song, attributes: ["views"] }],
    attributes: ["id"],
    limit: limit,
  });

  let combined = [];
  for (let i = 0; i < songs.length; i++) {
    let counterViews = 0;
    songs[i].toJSON().Songs.forEach((obj) => (counterViews += obj.views));
    topAlbums[i].dataValues.views = counterViews;
    combined.push(topAlbums[i]);
  }
  combined = combined.sort((a, b) => {
    return a.toJSON().views - b.toJSON().views;
  });
  res.json(combined.reverse());
});

router.get("/:id", async (req, res) => {
  const album = await Album.findByPk(req.params.id, {
    include: [
      {
        model: Song,
        attributes: ["id", "title", "length", "track_number", "media", "views"],
      },
      { model: Artist, attributes: ["id", "title", "media"] },
    ],
  });
  res.json(album);
});

//need to improve below methods, so child are affected too.
router.post("/", async (req, res) => {
  let body = Array.isArray(req.body) ? req.body : [req.body];
  body = body.map((album) => {
    album.uploadedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    return album;
  });

  try {
    const newAlbum = await Album.bulkCreate(body, {
      fields: ["title", "artistId", "media", "uploadedAt"],
    });
    res.json(newAlbum);
  } catch (e) {
    res.status(400).send({ msg: "Malformed data" });
  }
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedAlbum = await Album.update(fields, {
    where: {
      id: req.params.id,
    },
    fields: ["title", "media", "artist_id"],
  });

  res.json({ sucsess: updatedAlbum[0] === 1 });
});

router.delete("/:id", async (req, res) => {
  await Album.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

router.delete("/:id/hardDelete", async (req, res) => {
  await Album.destroy({
    where: {
      id: req.params.id,
    },
    force: true,
  });

  res.send("Deleted permanantly");
});

module.exports = router;
