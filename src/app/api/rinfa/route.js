import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {


    try {
        const result = await executeQuery("SELECT * FROM tbl_escalafon");
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
        // const { ano_fiscal, fecha, evento, lugar, riesgo, factor, pathName } = await request.formData();
        const data = await request.formData();
        console.log(data.get('fecha'))
        console.log(data.get('evento'))
        console.log(data.get('file'))

        // const result = await executeQuery(
        //     "INSERT INTO tbl_escalafon (ano_fiscal, fecha, evento, lugar, riesgo, factor, pathName) VALUES (?, ?, ?, ?, ?, ?, ?)",
        //     [ano_fiscal, fecha, evento, lugar, riesgo, factor, pathName]
        // );

        return NextResponse.json({
            // id: result.insertId,
            // ano_fiscal,
            // fecha,
            // evento,
            // lugar,
            // riesgo,
            // factor,
            // pathName
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