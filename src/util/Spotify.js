const clientId = '';
const redirectUri = 'https://moodecho.surge.sh/';
let accessToken;
let userId;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },
    getCurrentUserId() {
        if (userId) {
            return userId;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return userId;
        }).catch(err => console.log(err));


    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
    getUserPlaylists() {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return Promise.resolve(Spotify.getCurrentUserId()).then(response => {
            userId = response;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers
            }).then(response => response.json()
            ).then(jsonResponse => {
                if (!jsonResponse.items) {
                    return []
                }
                return jsonResponse.items.map(playlist => ({
                    playlistName: playlist.name,
                    playlistId: playlist.id
                }));
            })
        })

    },
    getPlaylist(playlistId) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri,

            }));
        })
    },

    savePlaylist(name, trackUris, playlistId) {
        if (!name || !trackUris.length) {
            return;
        }
        if (playlistId) {
            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };

            return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {
                userId = response;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`, {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({ name: name })
                }).then(() => {
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'PUT',
                        body: JSON.stringify({ uris: trackUris })
                    })
                })
            })

        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {
            userId = response;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })

    }

};

export default Spotify;
