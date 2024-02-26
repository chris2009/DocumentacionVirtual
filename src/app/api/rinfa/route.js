import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';
import { writeFile } from 'fs/promises'
import path from "path";
import unlink

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
        const file = data.get('file')

        if (!file) {
            return NextResponse.json({
                message: "Archivo es requerido"
            }, {
                error: 400
            }
            )
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public/rinfa', file.name)
        const relativePath = path.relative(process.cwd() + '/public', filePath);


        await writeFile(filePath, buffer)

        const result = await executeQuery(
            "INSERT INTO tbl_escalafon (fecha, pathName) VALUES (?, ?)",
            [
                data.get('fecha'),
                '/' + relativePath
            ]
        );

        return NextResponse.json({
            id: result.insertId,
            fecha: data.get('fecha'),
            pathName: '/' + relativePath
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
