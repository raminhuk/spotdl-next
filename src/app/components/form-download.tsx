'use client'

import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

interface Track {
  id: string
  name: string
  artist: string
  album: string
  thumbnail: string
  duration: string
  spotifyUrl: string
}

export default function Home() {
    const [tracks, setTracks] = useState<Track[]>([])
    const [playlistLink, setPlaylistLink] = useState<string>('')
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [path, setPath] = useState<string>('')

    const fetchTracks = async (playlistId: string) => {
        try {
            setIsFetching(true)
            const response = await axios.get(`/api/spotify/tracks/${playlistId}`)
            const fetchedTracks: Track[] = response.data.map((track: any) => ({
                id: track.id,
                name: track.name,
                artist: track.artist,
                album: track.album,
                thumbnail: track.thumbnail,
                duration: formatDuration(track.duration_ms),
                spotifyUrl: track.spotifyUrl,
            }))
            setTracks(fetchedTracks)
        } catch (error) {
            console.error('Erro ao buscar músicas:', error)
            alert('Erro ao buscar músicas. Verifique o link da playlist.')
        } finally {
            setIsFetching(false)
        }
    }

    const handleDownload = async () => {
        const playlistId = playlistLink.split('/playlist/')[1]?.split('?')[0]
        if (!playlistId) return alert('Link da playlist inválido!')

        setIsDownloading(true)
        setMessage('Download iniciado...')

        try {
            const response = await axios.post('/api/download', { playlistId })
            setMessage(response.data.message)
            setPath(response.data.path)
        } catch (error) {
            console.error('Erro no download:', error)
            setMessage('Erro ao baixar a playlist.')
        } finally {
            setIsDownloading(false)
        }
    }

    const formatDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000).toFixed(0)
        return `${minutes}:${seconds.padStart(2, '0')}`
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
                Download de Playlist do Spotify 🎵
            </h1>

            <div className="mb-8 flex flex-col items-center space-y-4">
                <p className="text-sm font-semibold text-stone-800">Link de exemplo:</p>
                <p className="text-sm text-stone-400">https://open.spotify.com/playlist/4l95mcr4BpKMUCzxPYHh24?si=vRKZEm-2S2iZDRYrwTFCDQ</p>
                <input
                    type="text"
                    placeholder="Cole o link da playlist aqui "
                    value={playlistLink}
                    onChange={(e) => setPlaylistLink(e.target.value)}
                    className="w-full max-w-2xl rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex space-x-4">
                    <button
                        onClick={async () => {
                            const playlistId = playlistLink.split('/playlist/')[1]?.split('?')[0]
                            if (playlistId) await fetchTracks(playlistId)
                        }}
                        className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={!playlistLink}
                    >
                        {isFetching ? 'Buscando...' : 'Buscar Músicas'}
                    </button>

                    <button
                        onClick={handleDownload}
                        className={`rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                            isDownloading ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={isDownloading || tracks.length === 0}
                    >
                        {isDownloading ? 'Baixando...' : 'Iniciar Download'}
                    </button>
                </div>
            </div>

            {message && <p className="mt-4 text-center text-lg font-semibold text-gray-700">{message}</p>}
            {path && <p className="mt-4 text-center text-lg font-semibold text-gray-700">{path}</p>}

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                        <Image src={track.thumbnail} width={192} height={192} alt={track.album} className="h-48 w-full object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{track.name}</h2>
                            <p className="text-sm text-gray-600">{track.artist}</p>
                            <p className="text-sm text-gray-500">{track.album}</p>
                            <p className="text-sm text-gray-400">Duração: {track.duration}</p>
                            <a
                                href={track.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center text-green-600 hover:text-green-800"
                            >
                                 Abrir no Spotify
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
