const CLIENT_ID = '';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
        const expireInMatch = window.location.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expireInMatch) {
            accessToken = accessTokenMatch[1];
            const expireIn = Number(expireInMatch[1]);
            window.setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessURL;
        }
    },
    Search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) return [];
                return jsonResponse.tracks.item.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    }

};

export default Spotify;
