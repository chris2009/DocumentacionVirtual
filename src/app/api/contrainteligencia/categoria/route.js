import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const lugar = url.searchParams.get("lugar");
    const year = url.searchParams.get("year");

    if (!lugar) {
        return NextResponse.json({ message: "Lugar es requerido" }, { status: 400 });
    }

    try {
        const query = "SELECT c.catAcro AS categoria, COUNT(*) AS cantidad  FROM tbl_ciber_contrainteligencia t INNER JOIN tbl_categoria c ON t.categoria = c.id  INNER JOIN tbl_lugar l ON t.lugar = l.id WHERE l.lugar = ? AND YEAR (t.fecha) = ? GROUP BY c.catAcro;";
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
