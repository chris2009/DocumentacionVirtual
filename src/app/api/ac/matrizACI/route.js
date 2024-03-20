import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT MONTH(c.fecha) AS mes, aci.activo_critico_institucional, COUNT(*) AS cantidad FROM tbl_acn_aci c INNER JOIN tbl_activo_critico_institucional aci ON c.ac_nacional_institucional = aci.id WHERE c.tipo_activo = 2 GROUP BY MONTH(c.fecha) , aci.activo_critico_institucional ORDER BY mes ASC;");
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
