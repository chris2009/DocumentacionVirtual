import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';
import { writeFile, unlink } from 'fs/promises'
import path from "path";

export async function GET(request, { params }) {

    try {
        const result = await executeQuery("SELECT * FROM tbl_rinfa WHERE id = ?", [params.id,]);
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
        const result = await executeQuery("DELETE FROM tbl_rinfa WHERE id = ?", [params.id])
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
        const file = data.get('file')
        unlink(file)

        if (!data.get("fecha")) {
            return NextResponse.json(
                {
                    message: "fecha is required"
                },
                {
                    status: 400
                })
        }

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

        const oldFilePath = path.join(process.cwd(), 'public/rinfa', params.id + '.pdf');
        try {
            await unlink(oldFilePath); // Elimina el archivo antiguo
        } catch (error) {
            console.error('Error al eliminar el archivo antiguo:', error);
        }
        
        const result = await executeQuery(
            "UPDATE tbl_rinfa SET fecha = ?, pathName = ? WHERE id = ?", [
            data.get('fecha'),
            '/' + relativePath,
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