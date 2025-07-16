import axios from 'axios';

export const getPlaylistFromSaavn = async (query) => {
  try {
    const response = await axios.get(`https://saavn.dev/api/search/songs`, {
      params: { query, page: 1, limit: 75 },
    });
    {console.log(response)}

    const rawSongs = response.data?.data?.results || [];

    const songs = rawSongs.map(song => ({
      id: song.id,
      title: song.name,
      artist: song.primaryArtists,
      album: song.album?.name || '',
      albumUrl: song.album?.url || '',
      duration: song.duration,
      image: song.image?.[2]?.url || '',
      audioUrl: song.downloadUrl?.[4]?.url || '',
    }));

    return songs.filter(song => song.audioUrl);
  } catch (error) {
    console.error('❌ Failed to fetch Saavn playlist:', error.message);
    return [];
  }
};
