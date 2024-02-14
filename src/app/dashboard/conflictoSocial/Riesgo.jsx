import executeQuery from "@/libs/mysql";

export default async function Riesgo() {
    const result = await executeQuery("SELECT riesgo FROM tbl_riesgo ORDER BY riesgo", [])

    return (
        <select className="border border-gray-300 rounded p-2" defaultValue="">
            <option value="" disabled hidden>Seleccione</option>
            {result.map((riesgo) => (
                <option key={riesgo.id} value={riesgo.riesgo}>{riesgo.riesgo}</option>
            ))}
        </select>
    )
}