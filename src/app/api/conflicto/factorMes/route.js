import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(c.fecha) AS mes, f.factor, COUNT(*) AS cantidad FROM tbl_conflictos c INNER JOIN tbl_factor f ON c.factor = f.id GROUP BY MONTH(c.fecha), f.factor;");
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
