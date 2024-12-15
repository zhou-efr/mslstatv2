/*
id: '2297709984',
    stream_id: '43160116952',
    user_id: '798312463',
    user_login: 'mathieusommetlive',
    user_name: 'MathieuSommetLive',
    title: 'ALIENS DARK DESCENT [EP01] - Bienvenue en enfer',
    description: '',
    created_at: '2024-11-09T18:55:47Z',
    published_at: '2024-11-09T18:55:47Z',
    url: 'https://www.twitch.tv/videos/2297709984',
    thumbnail_url: 'https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/dc7c790336ff8dad56e6_mathieusommetlive_43160116952_1731178541/thumb/custom-dca0f959-6cd7-4ee8-aff9-eb216f287eb2-%{width}x%{height}.jpeg',
    viewable: 'public',
    view_count: 8138,
    language: 'fr',
    type: 'archive',
    duration: '5h53m8s',
    muted_segments: null
*/

export interface TwitchVideo {
    id: string;
    live: boolean;
    stream_id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    title: string;
    description: string;
    created_at: string;
    published_at: string;
    url: string;
    thumbnail_url: string;
    viewable: string;
    view_count: number;
    language: string;
    type: string;
    duration: string;
    muted_segments: any;
}