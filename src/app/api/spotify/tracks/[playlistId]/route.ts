import { NextResponse } from 'next/server'

import { getPlaylistTracks } from '@/lib/spotify'


// Endpoint para buscar as músicas da playlist pelo ID
export async function GET(
    req: Request,
    { params }: { params: { playlistId: string } }
) {
    const { playlistId } = params

    if (!playlistId) {
        return NextResponse.json(
            { message: 'O ID da playlist é obrigatório.' },
            { status: 400 }
        )
    }

    try {
    // Chama a função getPlaylistTracks do spotify.ts para buscar as músicas
        const tracks = await getPlaylistTracks(playlistId)

        // Retorna as músicas como resposta JSON para o frontend
        return NextResponse.json(tracks)
    } catch (error) {
        console.error('Erro ao buscar músicas:', error)
        return NextResponse.json(
            { message: 'Erro ao buscar a playlist.', error },
            { status: 500 }
        )
    }
}
