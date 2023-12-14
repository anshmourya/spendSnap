import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from '../components/ui/dialog';
import { Goal } from '../context/Goal';
import { Progress } from '../components/ui/progress';
import { Label } from '../components/ui/label';
import { H4 } from '../components/typography';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const GoalList = () => {
    const { getGoal } = useContext(Goal);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        // Fetch goals when the component mounts
        const fetchData = async () => {
            try {
                const goalsData = await getGoal();
                setGoals(goalsData);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchData();
    }, [getGoal]);

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Card head="No of goals you have" total={goals.length} />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Your Goals</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        {goals.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead className="sticky top-0 text-white bg-primary">
                                    <tr>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">Current Saving</th>
                                        <th className="px-4 py-2">Note</th>
                                        <th className="px-4 py-2">edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {goals.map((goal) => (
                                        <tr key={goal.$id} className="bg-background">

                                            <td className="px-4 py-2">{goal.name}</td>
                                            <td className="px-4 py-2">	&#8377; {goal.amount}</td>
                                            <td className="px-4 py-2">	&#8377; {goal.saving}</td>
                                            <td className="px-4 py-2">{goal.note}</td>
                                            <td className="px-4 py-2"><EditGoal goal={goal} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No goals available</p>
                        )}
                    </DialogHeader>
                </DialogContent >
            </Dialog >
        </>
    );
};

export default GoalList;


const EditGoal = ({ goal }) => {
    const [currentGoal, setCurrentGoal] = useState(goal)
    const { updateGoal } = useContext(Goal)
    const progress = (goal.saving / goal.amount) * 100;

    const handleInputChange = (field, value) => {
        setCurrentGoal((prevGoal) => ({
            ...prevGoal,
            [field]: value,
        }));
    };
    const handleSaveGoal = () => {
        // Log the goal object or send it to your API
        console.log('Goal:', currentGoal);
        updateGoal(currentGoal)
        // Reset the form after saving
    };
    return <>
        <Dialog>
            <DialogTrigger>Edit Goal</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chnage your {currentGoal.name} progress</DialogTitle>
                    <DialogDescription>

                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <H4>Your progress</H4>
                <Progress value={progress} />
                <Label>Title</Label>
                <Input
                    value={currentGoal.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Label>Amount</Label>
                <Input
                    value={currentGoal.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                />
                <Label>Current Saving</Label>
                <Input
                    value={currentGoal.saving}
                    onChange={(e) => handleInputChange('saving', e.target.value)}
                />
                <Label>Any Note?</Label>
                <Input
                    value={currentGoal.note}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                />

                <DialogFooter>
                    <Button variant="outline" onClick={handleSaveGoal}>submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </>
}


