import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ticketNumber = searchParams.get('number');
    const userEmail = searchParams.get('email'); // SECURITY: Only show tickets for this email

    if (!ticketNumber || !userEmail) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        // Connect to the osTicket Database
        const connection = await mysql.createConnection({
            host: process.env.OSTICKET_DB_HOST || '102.223.37.189',
            user: process.env.OSTICKET_DB_USER || 'dash_reader',
            password: process.env.OSTICKET_DB_PASSWORD || 'Password_123',
            database: process.env.OSTICKET_DB_NAME || 'osticket_db',
            port: Number(process.env.OSTICKET_DB_PORT) || 3306,
        });

        // SQL Query to retrieve the thread conversation
        const [rows]: any = await connection.execute(`
            SELECT 
                e.body as message, 
                e.poster as sender, 
                e.created as timestamp, 
                e.type as sender_type
            FROM ost_thread_entry e
            JOIN ost_thread th ON e.thread_id = th.id
            JOIN ost_ticket tk ON th.object_id = tk.ticket_id
            WHERE tk.number = ? AND tk.email = ?
            ORDER BY e.created ASC
        `, [ticketNumber, userEmail]);

        await connection.end();

        if (rows.length === 0) {
            return NextResponse.json({ error: "Access Denied or Not Found" }, { status: 404 });
        }

        return NextResponse.json(rows);
    } catch (error: any) {
        console.error("Database error fetching ticket thread:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
