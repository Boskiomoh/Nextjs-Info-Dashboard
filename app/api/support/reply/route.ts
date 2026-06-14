import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
    try {
        const { ticketNumber, email, message, userName } = await request.json();

        const connection = await mysql.createConnection({
            host: process.env.OSTICKET_DB_HOST || '102.223.37.189',
            user: process.env.OSTICKET_DB_USER || 'dash_reader',
            password: process.env.OSTICKET_DB_PASSWORD || 'Password_123',
            database: process.env.OSTICKET_DB_NAME || 'osticket_db'
        });

        // 1. Find the Thread ID for this Ticket
        const [threadRows]: any = await connection.execute(`
            SELECT th.id 
            FROM ost_thread th
            JOIN ost_ticket tk ON th.object_id = tk.ticket_id
            JOIN ost_user u ON tk.user_id = u.id
            JOIN ost_user_email ue ON u.id = ue.user_id
            WHERE tk.number = ? AND ue.address = ? AND th.object_type = 'T'
        `, [ticketNumber, email]);

        if (threadRows.length === 0) {
            return NextResponse.json({ error: "Thread not found" }, { status: 404 });
        }

        const threadId = threadRows[0].id;

        // 2. Insert the Reply (Type 'M' for Message/User)
        await connection.execute(`
            INSERT INTO ost_thread_entry (thread_id, type, poster, body, format, created, updated)
            VALUES (?, 'M', ?, ?, 'html', NOW(), NOW())
        `, [threadId, userName, `<div>${message}</div>`]);

        // 3. Update the ticket status so Staff see it as "Recently Updated"
        await connection.execute(`
            UPDATE ost_ticket SET updated = NOW() WHERE number = ?
        `, [ticketNumber]);

        await connection.end();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
