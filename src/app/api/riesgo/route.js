import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const lugar = url.searchParams.get("lugar");
    const year = url.searchParams.get("year"); // Agrega la obtención del parámetro year

    // Asegúrate de validar los parámetros 'lugar' y 'year' para evitar consultas SQL maliciosas
    if (!lugar || !year) {
        return NextResponse.json({ message: "Lugar y año son requeridos", status: 400 });
    }

    try {
        // Actualiza el query para incluir el filtro por año
        const query = "SELECT r.riesgo AS riesgo, COUNT(*) AS cantidad FROM tbl_2023_conflictos t INNER JOIN tbl_riesgo r ON t.riesgo = r.id WHERE t.lugar = ? AND YEAR(t.fecha) = ? GROUP BY r.riesgo;";
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
