
import executeQuery from "@/libs/mysql";

export default async function Factor() {
    const result = await executeQuery("SELECT factor FROM tbl_factor ORDER BY factor", [])

    return (
        <select className="border border-gray-300 rounded p-2" defaultValue="">
            <option value="" disabled hidden>Seleccione</option>
            {result.map((factor) => (
                <option key={factor.id} value={factor.factor}>{factor.factor}</option>
            ))}
        </select>
    )
}