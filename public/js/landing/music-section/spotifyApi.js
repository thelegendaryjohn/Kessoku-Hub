import fetch from "node-fetch";

export async function getAccessToken(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export async function getTrack(songId, accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch track ${songId}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
        preview_url: data.preview_url
    };
}