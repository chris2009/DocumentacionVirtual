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
        const query = "SELECT f.factor AS factor, COUNT(*) AS cantidad FROM tbl_conflictos t INNER JOIN tbl_factor f ON t.factor = f.id WHERE t.lugar = ? AND YEAR(t.fecha) = ? GROUP BY f.factor;";
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
