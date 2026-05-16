import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Prepare the data in the format osTicket expects
        const ticketPayload = {
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: `data:text/html,${body.message}`, // osTicket needs this prefix
            topicId: 1, // 1 is usually the default 'General Inquiry'
            source: 'API'
        };

        const apiUrl = process.env.OSTICKET_API_URL;
        const apiKey = process.env.OSTICKET_API_KEY;

        if (!apiUrl || !apiKey) {
            return NextResponse.json({ error: "Server configuration missing (API Key/URL)" }, { status: 500 });
        }

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketPayload)
        });

        if (res.status === 201) {
            const ticketNumber = await res.text();
            return NextResponse.json({ message: "Success", id: ticketNumber });
        } else {
            const errorData = await res.text();
            console.error("osTicket Error:", errorData);
            return NextResponse.json({ error: "osTicket rejected the request. Check IP Whitelist." }, { status: res.status });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
