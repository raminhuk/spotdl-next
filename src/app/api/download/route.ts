import ytdl from '@distube/ytdl-core'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

import { getPlaylistTracks } from '@/lib/spotify'
import { searchYoutubeVideo } from '@/lib/youtube'

export async function POST(req: NextRequest) {
    const { playlistId } = await req.json()

    if (!playlistId) {
        return NextResponse.json(
            { message: 'ID da playlist é obrigatório.' },
            { status: 400 }
        )
    }

    // Função que cria a pasta, se ela não existir
    function ensureDirectoryExists(directory: string) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true }) // Cria pasta e subpastas, se necessário
            console.log(`Pasta '${directory}' criada.`)
        }
    }

    try {
        const tracks = await getPlaylistTracks(playlistId)

        for (const track of tracks) {
            try {
                const musicDir = path.resolve('musicas')
                ensureDirectoryExists(musicDir)
                
                const query = `${track.name} ${track.artist}`
                const videoUrl = await searchYoutubeVideo(query)

                if (!videoUrl) {
                    console.error(`Vídeo não encontrado para: ${query}`)
                    continue
                }

                const outputPath = path.resolve('musicas', `${track.name}.mp3`)
                const writeStream = fs.createWriteStream(outputPath)

                await new Promise<void>((resolve, reject) => {
                    ytdl(videoUrl, { quality: 'highestaudio' })
                        .pipe(writeStream)
                        .on('finish', () => {
                            console.log(`Download concluído: ${track.name}`)
                            resolve()
                        })
                        .on('error', (err) => {
                            console.error(`Erro ao baixar ${track.name}:`, err)
                            reject(err)
                        })
                })
            } catch (err) {
                console.error(`Erro ao processar ${track.name}:`, err)
            }
        }

        return NextResponse.json(
            { 
                message: 'Download concluído com sucesso!',
                path: 'Suas músicas foram baixadas na pasta musicas na raíz deste projeto!'
            }
        )
    } catch (error: any) {
        console.error('Erro ao baixar a playlist:', error)
        return NextResponse.json(
            { message: 'Erro ao baixar a playlist.', error: error.message },
            { status: 500 }
        )
    }
}
