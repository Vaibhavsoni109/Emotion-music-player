import axios from 'axios';

export const getPlaylistFromSaavn = async (emotion) => {
  const query = `${emotion} hindi song`;

  try {
    const response = await axios.get(`https://saavn.dev/api/search/songs`, {
      params: { query, page: 1, limit: 75 }, // 🔥 Ask for 75 results
    });

    const rawSongs = response.data.data.results;

    const songs = rawSongs.map(song => ({
      id: song.id,
      title: song.name,
      artist: song.primaryArtists,
      album: song.album?.name || '',
      albumUrl: song.album?.url || '',
      duration: song.duration,
      audioUrl: song.downloadUrl?.[4]?.url, // High quality
      image: song.image?.[2]?.url || '',
    }));

    return songs.filter(song => song.audioUrl); // remove invalid entries
  } catch (error) {
    console.error('Failed to load Saavn playlist:', error);
    return [];
  }
};
