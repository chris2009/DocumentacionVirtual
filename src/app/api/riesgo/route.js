import { NextResponse } from "next/server";
import executeQuery from "@/libs/mysql";

export async function GET(request) {
    const url = new URL(request.url);
    const lugar = url.searchParams.get("lugar");

    try {
        const query = "SELECT r.riesgo AS riesgo, COUNT(*) AS cantidad FROM tbl_2023_conflictos t INNER JOIN  tbl_riesgo r ON t.riesgo = r.id WHERE t.lugar = 'lima' GROUP BY r.riesgo;";
        const result = await executeQuery(query, [lugar]);
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