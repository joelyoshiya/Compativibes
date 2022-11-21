"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const CLIENT_ID = "2f00ead973024ee8bbca49fa896bd640"; // Your client id
  const CLIENT_SECRET = process.env.SPOTIFY_SECRET; // Your secret
  const REDIRECT_URI = "http://localhost:3000"; // Your redirect uri
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  // authorization code
  const urlSearchParams = new URLSearchParams();
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: RESPONSE_TYPE,
    scope: "user-read-private user-read-email",
  };
  Object.keys(params).forEach((key) =>
    urlSearchParams.append(key, params[key])
  );
  const redirect_uri = AUTH_ENDPOINT + "?" + urlSearchParams.toString();

  // get user info
  const getUserInfo = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserInfo(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a href={redirect_uri}>Login to Spotify</a>
        ) : (
          <div>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserInfo}>Get User Info</button>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        )}
      </header>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {artists.map((artist) => (
        <div key={artist.id}>
          {artist.images.length ? (
            <img width={"100%"} src={artist.images[0].url} alt="" />
          ) : (
            <div>No Image</div>
          )}
          {artist.name}
        </div>
      ))}
    </div>
  );
}
