import {getToken} from '@/lib/twitch/getToken'
import {TwitchVideo} from "@/lib/twitch/types";

export const getLatestStream = async (user_id:string, first = 3, period = ""):Promise<Array<TwitchVideo>> => {
    try {
        const token = await getToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Client-Id", process.env["TWITCH_CLIENT_ID"] || "" as string);	

        let urlencoded = new URLSearchParams();
        urlencoded.append("user_id", user_id);
        urlencoded.append("sort", "time");
        urlencoded.append("first", first.toString());

        if (period !== "") {
            urlencoded.append("period", period);
        }

        let requestOptions:RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(process.env["TWITCH_API_URL"] + "/helix/videos?" + urlencoded);

        const res = await fetch(process.env["TWITCH_API_URL"] + "/helix/videos?" + urlencoded, requestOptions);
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(`getLatestStream - ${res.status} : ${JSON.stringify(data)}`);
        }

        return data.data;
    } catch (error) {
        throw new Error(`getLatestStream : ${user_id} - ${JSON.stringify(error)}`);
    }
}