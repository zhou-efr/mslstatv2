import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from '@/lib/twitch/getToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let status = 200;
    let response = {};
    try {
        const token = await getToken();
        response = { token };
    } catch (error) {
        console.error(error);
        status = 500;
        response = { error: 'Internal Server Error' };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}