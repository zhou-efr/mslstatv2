import { getLatestStream } from "@/lib/twitch/getLatestStream";
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { user_id } = req.body;

    let status = 200;
    let response: any = {};

    try {
        const stream = await getLatestStream(user_id);
        response = { stream };
    } catch (error) {
        console.error(error);
        status = 500;
        response = { error };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}