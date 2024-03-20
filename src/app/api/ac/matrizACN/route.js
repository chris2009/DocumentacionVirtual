import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT  MONTH(c.fecha) AS mes, acn.activo_critico_nacional, COUNT(*) AS cantidad FROM tbl_acn_aci c INNER JOIN tbl_activo_critico_nacional acn ON c.ac_nacional_institucional = acn.id WHERE c.tipo_activo = 1 GROUP BY MONTH(c.fecha) , acn.activo_critico_nacional ORDER BY mes ASC;");
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
