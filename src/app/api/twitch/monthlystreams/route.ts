import { NextApiRequest, NextApiResponse } from 'next';
import { getLatestStream } from '@/lib/twitch/getLatestStream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user_id } = req.body;

    let status = 200;
    let response: any = {};

    try {
        const stream = await getLatestStream(user_id, 31, 'month');
        response = { stream };
    } catch (error) {
        console.error(error);
        status = 500;
        response = { error };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}