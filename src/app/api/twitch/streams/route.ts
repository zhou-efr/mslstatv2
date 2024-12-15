import { getLatestStream } from '@/lib/twitch/getLatestStream';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const user_id = searchParams.get('user_id') || '798312463';
    const start = parseInt(searchParams.get('start') || '0');
    const period = searchParams.get('period') || 'month';

    console.log({
        user_id,
        start,
        period,
    });
    

    let status = 200;
    let response: any = {};

    try {
        const stream = await getLatestStream(user_id, 100, 'all');

        let before = new Date(start);
        let days = period === 'week' ? 7 : (period === 'month' ? 30 : 1);
        let after = new Date(before.getTime() - days * 24 * 60 * 60 * 1000);

        let filtered = stream.filter((video) => {
            let published_at = new Date(video.published_at);
            return published_at >= after && published_at <= before;
        });

        response = { filtered };
    } catch (error) {
        console.error(error);
        status = 500;
        response = { error };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    return Response.json(response, { status });
}