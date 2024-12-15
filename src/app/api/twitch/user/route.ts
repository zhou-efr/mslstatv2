import { NextApiRequest, NextApiResponse } from 'next';
import { getTwitchUser } from '@/lib/twitch/getTwitchUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username } = req.body;

    let status = 200;
    let response = {};

    try {
        const user = await getTwitchUser(username);
        response = { user };
    } catch (error) {
        console.error(error);
        status = 500;
        response = { error: 'Internal Server Error' };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}