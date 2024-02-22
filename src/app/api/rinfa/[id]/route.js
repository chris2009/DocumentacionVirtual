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
    try {
        const data = await request.formData();
        // const { id } = params;
        if (!data.get("evento")) {
            return NextResponse.json(
                {
                    message: "evento is required"
                },
                {
                    status: 400
                })
        }

        if (!data.get("file")) {
            return NextResponse.json({
                message: "file is required"
            }, {
                status: 400
            })
        }

        const result = await executeQuery(
            "UPDATE tbl_escalafon SET fecha = ?, evento = ?, pathName = ? WHERE id = ?", [
            // [data.fecha, data.evento, data.pathName, id]
            {
                fecha: data.get("fecha"),
                evento: data.get("evento")
            },
            params.id
        ]);

        return NextResponse.json({
            ...result,
        });
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