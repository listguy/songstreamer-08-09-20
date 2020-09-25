"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: "artistId",
      });
      this.belongsTo(models.Album, {
        foreignKey: "albumId",
      });
      this.belongsToMany(models.Playlist, {
        through: models.SongsInPlaylists,
        // foreignKey: "songId",
        // as: "songs",
      });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      albumId: DataTypes.INTEGER,
      artistId: DataTypes.INTEGER,
      media: DataTypes.STRING,
      length: DataTypes.INTEGER,
      trackNumber: DataTypes.INTEGER,
      lyrics: DataTypes.STRING,
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
      uploaded_at: { type: DataTypes.INTEGER, defaultValue: sequelize.NOW },
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};