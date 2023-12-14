import { createContext, useState } from "react";
import { databaseId, databases } from "../../service/createDocument";
import { ID } from "appwrite";
import { notify } from "../helper/notification";


export const Goal = createContext();

export const GoalProvider = ({ children }) => {
    const [goals, setGoals] = useState();

    const addGoal = async (goal) => {
        try {
            const response = await databases.createDocument(databaseId, "657a30168bb267ee10ba", ID.unique(), goal);
            console.log(response);
            notify("new goal has beed added", "success")
        } catch (error) {
            console.error(error);
        }
    };

    const updateGoal = async (newGoal) => {
        try {
            const response = await databases.updateDocument(databaseId, "657a30168bb267ee10ba", newGoal.$id, {
                name: newGoal.name,
                amount: newGoal.amount,
                saving: newGoal.saving,
                note: newGoal.note,
            });
            notify("goal has been updated", "success")
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getGoal = async () => {
        try {
            const response = await databases.listDocuments(databaseId, "657a30168bb267ee10ba");
            console.log(response.documents);
            return response.documents;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Goal.Provider value={{ addGoal, updateGoal, getGoal, goals }}>
            {children}
        </Goal.Provider>
    );
};
