import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT * FROM tbl_2023_conflictos");
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
        const { ano_fiscal, fecha, evento, lugar, riesgo, factor, pathName } = await request.json();

        const result = await executeQuery(
            "INSERT INTO tbl_2023_conflictos (ano_fiscal, fecha, evento, lugar, riesgo, factor) VALUES (?, ?, ?, ?, ?, ?)",
            [ano_fiscal, fecha, evento, lugar, riesgo, factor]
        );

        return NextResponse.json({
            id: result.insertId,
            ano_fiscal,
            fecha,
            evento,
            lugar,
            riesgo,
            factor
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