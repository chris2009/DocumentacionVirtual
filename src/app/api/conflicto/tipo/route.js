import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const lugar = url.searchParams.get("lugar");
    const year = url.searchParams.get("year")

    // Asegúrate de validar el parámetro 'lugar' para evitar consultas SQL maliciosas
    if (!lugar) {
        return NextResponse.json({ message: "Lugar es requerido" }, { status: 400 });
    }

    try {
        const query = "SELECT tcs.tipo_conflicto AS tipo, COUNT(*) AS cantidad FROM tbl_conflictos t INNER JOIN tbl_tipo tcs ON t.tipo_conflicto_social = tcs.id INNER JOIN tbl_lugar l ON t.lugar = l.id WHERE l.lugar = ? AND YEAR(t.fecha) = ? GROUP BY tcs.tipo_conflicto";
        const result = await executeQuery(query, [lugar, year]);
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