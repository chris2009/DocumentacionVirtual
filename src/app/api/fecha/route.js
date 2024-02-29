import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const year = url.searchParams.get("year");

    try {
        // Modifica el query según la estructura de tu base de datos y tus necesidades
        const queryYear = "SELECT MONTH(fecha) AS mes, COUNT(*) AS cantidad FROM tbl_2023_conflictos WHERE YEAR(fecha) = ? GROUP BY MONTH(fecha);";
        const resultYear = await executeQuery(queryYear, [year]);

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