import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET(request, { params }) {

    // return NextResponse.json(result)
    try {
        const result = await executeQuery("SELECT * FROM tbl_escalafon WHERE id = ?", [params.id,]);
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Rinfa no encontrado",
                },
                {
                    status: 404
                }
            );
        }
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(request, { params }) {
    try {
        const result = await executeQuery("DELETE FROM tbl_escalafon WHERE id = ?", [params.id])
        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Rinfa no encontrado"
                },
                {
                    status: 404
                }
            )
        }
        return new Response(null, {
            status: 204
        })
    } catch (error) {
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

export async function PUT(request, { params }) {
    const data = await request.json();
    const { id } = params;

    const result = await executeQuery(
        "UPDATE tbl_escalafon SET ano_fiscal = ?, fecha = ?, evento = ?, lugar = ?, riesgo = ?, factor = ?, pathName = ? WHERE id = ?",
        [data.ano_fiscal, data.fecha, data.evento, data.lugar, data.riesgo, data.factor, data.pathName, id]
    );

    return NextResponse.json({
        ...data,
    });
}