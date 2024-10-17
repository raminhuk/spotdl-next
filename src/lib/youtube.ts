import axios from 'axios'

export async function searchYoutubeVideo(query: string): Promise<string | null> {
    const apiKey = process.env.YOUTUBE_API_KEY
    const url = `https://www.googleapis.com/youtube/v3/search`

    try {
        const response = await axios.get(url, {
            params: {
                part: 'snippet',
                q: query,
                maxResults: 1,
                type: 'video',
                key: apiKey,
            },
        })

        const items = response.data.items
        if (items && items.length > 0) {
            const videoId = items[0].id.videoId
            return `https://www.youtube.com/watch?v=${videoId}`
        } else {
            console.error('Nenhum vídeo encontrado para:', query)
            return null
        }
    } catch (error) {
        console.error('Erro ao buscar vídeo no YouTube:', error)
        return null
    }
}
