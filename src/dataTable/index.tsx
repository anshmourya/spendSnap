import { useContext } from "react"
import { Bill } from "../context/Bill"

const DataTable = () => {
    const { expenseData } = useContext(Bill)
    return (
        <div className="max-h-[300px] overflow-y-auto my-10 ">
            <table className="w-full text-left border border-collapse table-auto">
                <thead className="sticky top-0 bg-primary">
                    <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        expenseData?.list && expenseData.list.map((item, key) => <tr key={key} className="bg-secondary">
                            <td className="px-4 py-2 font-semibold">{item.name}</td>
                            <td className="px-4 py-2 font-semibold">&#8377; {item.price}</td>
                        </tr>)
                    }


                    {/* ... (your table rows) */}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
