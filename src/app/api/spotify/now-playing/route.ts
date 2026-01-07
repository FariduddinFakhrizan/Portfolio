import { NextResponse } from 'next/server'

// Spotify API credentials - these need to be set in .env
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'

async function getAccessToken() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Spotify credentials missing')
    }

    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN || '',
        }),
        cache: 'no-store',
    })

    return response.json()
}

export async function GET() {
    // Check if Spotify credentials are configured
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        return NextResponse.json({
            isPlaying: false,
            error: 'Spotify not configured',
            message: 'Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN to .env'
        })
    }

    try {
        const { access_token } = await getAccessToken()

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: 'no-store',
        })

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false })
        }

        const song = await response.json()

        if (!song.item) {
            return NextResponse.json({ isPlaying: false })
        }

        const isPlaying = song.is_playing
        const name = song.item.name
        const artist = song.item.artists.map((a: { name: string }) => a.name).join(', ')
        const albumArt = song.item.album.images[0]?.url
        const url = song.item.external_urls.spotify

        return NextResponse.json({
            isPlaying,
            name,
            artist,
            albumArt,
            url,
        })
    } catch (error) {
        console.error('Spotify API error:', error)
        return NextResponse.json({
            isPlaying: false,
            error: 'Failed to fetch from Spotify'
        })
    }
}
