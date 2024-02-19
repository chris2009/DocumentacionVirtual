// import { NextResponse } from "next/server";

// export async function GET(request) {

//     try {
//         const result = await executeQuery("SELECT * FROM tbl_2023_conflictos");
//         const { searchParams } = new URL(request.url)
//         console.log(request.url)
//         const query = searchParams.get('query')

//         const filteredConflictos = result.data.result.filter((conflicto) => {
//             return conflicto.evento.toLowerCase().includes(query.toLowerCase()) || conflicto.lugar.toLowerCase().includes(query.toLowerCase())

//         })

//         return NextResponse.json(filteredConflictos);
//     } catch (error) {
//         return NextResponse.json(
//             {
//                 message: error.message,
//             },
//             {
//                 status: 500
//             }
//         );
//     }
// }


import { NextResponse } from "next/server";

export async function GET(request) {

    try {

        const requestBody = await request.json();
        const query = requestBody.query;

        const result = await executeQuery("SELECT * FROM tbl_2023_conflictos");
       
        console.log(request.url)

        const filteredConflictos = result.data.result.filter((conflicto) => {
            return conflicto.evento.toLowerCase().includes(query.toLowerCase()) || conflicto.lugar.toLowerCase().includes(query.toLowerCase())

        })

        return NextResponse.json(filteredConflictos);
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