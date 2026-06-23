import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.OSTICKET_DB_HOST,
            user: process.env.OSTICKET_DB_USER,
            password: process.env.OSTICKET_DB_PASSWORD,
            database: process.env.OSTICKET_DB_NAME,
            port: Number(process.env.OSTICKET_DB_PORT)
        });

        const [rows]: any = await connection.execute(`
            SELECT tk.number, cdata.subject, tk.created, tk.status_id
            FROM ost_ticket tk
            JOIN ost_ticket__cdata cdata ON tk.ticket_id = cdata.ticket_id
            JOIN ost_user_email ue ON tk.user_id = ue.user_id
            WHERE ue.address = ?
            ORDER BY tk.created DESC
        `, [email]);

        await connection.end();
        return NextResponse.json(rows);
    } catch (error: any) {
        console.error("Database error fetching ticket list:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
