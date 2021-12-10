import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
	const spotifyApi = useSpotify();
	const [currentIdTrack, setCurrentIdTrack] =
		useRecoilState(currentTrackIdState);
	const [songInfo, setSongInfo] = useState(null);

	useEffect(() => {
		const fetchSongInfo = async () => {
			if (currentIdTrack) {
				const trackinfo = await fetch(
					`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
					{
						headers: {
							Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
						},
					}
				).then((res) => res.json());
				setSongInfo(trackinfo);
			}
		};
		fetchSongInfo();
	}, [currentIdTrack, spotifyApi]);

	return songInfo;
}

export default useSongInfo;