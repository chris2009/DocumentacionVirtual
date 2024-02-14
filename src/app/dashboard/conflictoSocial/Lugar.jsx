import executeQuery from "@/libs/mysql";

export default async function  Lugar() {
    const result = await executeQuery("SELECT lugar FROM tbl_lugar ORDER BY lugar", [])

    return (
        <select className="border border-gray-300 rounded p-2" defaultValue="">
            <option value="" disabled hidden>Seleccione</option>
            {result.map((lugar) => (
                <option key={lugar.id} value={lugar.lugar}>{lugar.lugar}</option>
            ))}
        </select>
    )
}