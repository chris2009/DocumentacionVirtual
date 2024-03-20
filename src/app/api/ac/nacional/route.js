import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(fecha) AS mes, COUNT(*) AS total, ac_nacional_institucional FROM tbl_acn_aci WHERE tipo_activo = 1 GROUP BY MONTH(fecha), ac_nacional_institucional ORDER BY mes ASC;");
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
