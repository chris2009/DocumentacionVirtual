import executeQuery from "@/libs/mysql";

export default async function Riesgo() {
    const result = await executeQuery("SELECT riesgo FROM tbl_riesgo", [])

    return (
        <select className="border border-kaitoke-green-100 outline-kaitoke-green-200  rounded p-2" defaultValue="">
            <option value="" disabled hidden>Riesgo...</option>
            {result.map((riesgo) => (
                <option key={riesgo.id} value={riesgo.riesgo}>{riesgo.riesgo}</option>
            ))}
        </select>
    )
}