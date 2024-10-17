import axios, { AxiosResponse } from 'axios'

interface SpotifyTracksResponse {
    items: [{
      track: {
        id: string
        name: string
        artists: [
            { name: string }
        ]
        album: {
          name: string
          images: [
            { url: string }
          ]
        }
        duration_ms: number,
        external_urls: {
            spotify: string
        }
      }
    }]
  }

async function getAccessToken(): Promise<string> {
    const auth = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
    return response.data.access_token
}

export async function getPlaylistTracks(playlistId: string) {
    const token = await getAccessToken() // Função que busca o token de acesso da API do Spotify
    console.log('Token de acesso:', token)
  
    const response: AxiosResponse<SpotifyTracksResponse> = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    )
  
    // Mapeando e retornando as informações necessárias para o frontend
    return response.data.items.map((item) => {
        const track = item.track
        return {
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name || 'Artista Desconhecido',
            album: track.album.name,
            thumbnail: track.album.images[0]?.url || '',
            duration_ms: track.duration_ms,
            spotifyUrl: track.external_urls.spotify,
        }
    })
}