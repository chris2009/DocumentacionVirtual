import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(fecha) AS mes, cat.catAcro, COUNT(*) AS cantidad FROM tbl_ciber_contrainteligencia c INNER JOIN tbl_categoria cat ON c.categoria = cat.id GROUP BY  MONTH (fecha), cat.catAcro;");
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
