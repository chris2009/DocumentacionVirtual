import { NextResponse } from "next/server";
import executeQuery from '@/libs/mysql';

export async function GET() {

    try {
        const result = await executeQuery("SELECT * FROM tbl_ciber_contrainteligencia");
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
