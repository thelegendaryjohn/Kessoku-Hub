import fetch from "node-fetch";
import * as cheerio from "cheerio";

// export async function getAccessToken(clientId, clientSecret) {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
//         },
//         body: 'grant_type=client_credentials'
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.access_token;
// }

// export async function getTrack(songId, accessToken) {
//     const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to fetch track ${songId}: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return {
//         preview_url: data.preview_url
//     };
// }

export async function getPreviewFromSpotifyEmbed(songId) {
	const response = await fetch(
		`https://open.spotify.com/embed/track/${songId}`
	);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch embed page for track ${songId}: ${response.status} ${response.statusText}`
		);
	}

	const html = await response.text();
	const $ = cheerio.load(html);

	const jsonText = $("#__NEXT_DATA__").html();
	if (!jsonText) {
		throw new Error("Failed to locate __NEXT_DATA__ script tag in HTML");
	}

	const data = JSON.parse(jsonText);
	const preview_url =
		data?.props?.pageProps?.state?.data?.entity?.audioPreview?.url;

	if (!preview_url) {
		throw new Error(`Preview URL not found for track ${songId}`);
	}

	return preview_url;
}