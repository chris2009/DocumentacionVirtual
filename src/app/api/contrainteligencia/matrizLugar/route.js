import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(c.fecha) AS mes, l.lugar, COUNT(*) AS cantidad FROM tbl_ciber_contrainteligencia c INNER JOIN tbl_lugar l ON c.lugar = l.id GROUP BY  MONTH (c.fecha), c.lugar;");
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        );
    }
}
