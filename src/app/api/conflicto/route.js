import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {

    try {
        const result = await executeQuery("SELECT * FROM tbl_conflictos");
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


export async function POST(request) {

    try {
        const { fecha, evento, lugar, riesgo, factor, tipo_conflicto_social } = await request.json();

        const result = await executeQuery(
            "INSERT INTO tbl_conflictos ( fecha, evento, lugar, riesgo, factor, tipo_conflicto_social) VALUES (?, ?, ?, ?, ?, ?)",
            [fecha, evento, lugar, riesgo, factor, tipo_conflicto_social]
        );

        return NextResponse.json({
            id: result.insertId,
            fecha,
            evento,
            lugar,
            riesgo,
            factor,
            tipo_conflicto_social
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )

    }
}