import { createContext, useEffect, useState } from "react"

import { databaseId, databases } from "../../service/createDocument"
import { Query } from "appwrite"
export const Bill = createContext()


export const BillProvider = ({ children }) => {

    const [currentBill, setCurrentBill] = useState<object>({})
    const [expenseData, setExpenseData] = useState()

    const getData = async () => {
        try {
            const totalResponse = await databases.listDocuments(databaseId, "6579b82430c71fddebe3", [
                Query.select(["total"]),
            ]);

            const categoryResponse = await databases.listDocuments(databaseId, "6579be4b77348f945ae0");
            const listResponse = await databases.listDocuments(databaseId, "6579b913dbec91083d26");

            const total = totalResponse.documents.reduce((sum, doc) => sum + doc.total, 0);

            const categories = {};
            for (const category of categoryResponse.documents) {
                if (categories.hasOwnProperty(category.name)) {
                    categories[category.name].total += category.total;
                } else {
                    categories[category.name] = {
                        name: category.name,
                        total: category.total,
                    };
                }
            }
            const categoryArray = Object.values(categories);

            const list = listResponse.documents.map(item => ({
                name: item.name,
                price: item.price,
            }));

            const billData = {
                total,
                category: categoryArray,
                list: list,
            };

            setExpenseData(billData)
            console.log(billData)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData()
    }, [])
    return <Bill.Provider value={{
        setCurrentBill, currentBill, expenseData
    }}>{children}</Bill.Provider>
}