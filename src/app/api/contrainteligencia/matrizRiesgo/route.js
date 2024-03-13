import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(fecha) AS mes, r.riesgo, COUNT(*) AS cantidad FROM tbl_ciber_contrainteligencia c INNER JOIN tbl_riesgo r ON c.riesgo = r.id GROUP BY MONTH(fecha), r.riesgo;");
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
