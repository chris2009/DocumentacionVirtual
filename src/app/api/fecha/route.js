import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const lugar = url.searchParams.get("lugar"); // Agrega la obtención del parámetro lugar

    try {
        // Asegúrate de adaptar el query para incluir el filtro por lugar
        const queryYear = "SELECT MONTH(fecha) AS mes, COUNT(*) AS cantidad FROM tbl_2023_conflictos WHERE YEAR(fecha) = ? AND lugar = ? GROUP BY MONTH(fecha);";
        const resultYear = await executeQuery(queryYear, [year, lugar]); // Incluye el lugar en los parámetros

        return NextResponse.json(resultYear);
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
