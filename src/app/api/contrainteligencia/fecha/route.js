import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const lugar = url.searchParams.get("lugar"); // Agrega la obtención del parámetro lugar

    try {
        const queryYear = "SELECT MONTH(t.fecha) AS mes, COUNT(*) AS cantidad FROM tbl_ciber_contrainteligencia t INNER JOIN tbl_lugar l ON t.lugar = l.id WHERE YEAR(t.fecha) = ? AND l.lugar = ? GROUP BY MONTH(t.fecha);";
        const resultYear = await executeQuery(queryYear, [year, lugar]); // Incluye el lugar en los parámetros

        return NextResponse.json(resultYear);
        // Asegúrate de adaptar el query para incluir el filtro por lugar
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
