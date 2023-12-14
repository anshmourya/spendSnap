import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from '../../components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Goal } from '../../context/Goal';
import { Button } from '../ui/button';

const Goals = () => {
    const { addGoal } = useContext(Goal)
    const [goal, setGoal] = useState({
        name: '',
        amount: '',
        saving: '',
        note: '',
    });

    const handleInputChange = (field, value) => {
        setGoal((prevGoal) => ({
            ...prevGoal,
            [field]: value,
        }));
    };

    const handleSaveGoal = () => {
        // Log the goal object or send it to your API
        console.log('Goal:', goal);
        addGoal(goal)
        // Reset the form after saving
        setGoal({
            title: '',
            amount: '',
            currentSaving: '',
            note: '',
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>

                    <Button variant="secondary">Add goal</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Goal and Update Existing Goal</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        <Label>Title</Label>
                        <Input
                            value={goal.title}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <Label>Amount</Label>
                        <Input
                            value={goal.amount}
                            onChange={(e) => handleInputChange('amount', e.target.value)}
                        />
                        <Label>Current Saving</Label>
                        <Input
                            value={goal.currentSaving}
                            onChange={(e) => handleInputChange('saving', e.target.value)}
                        />
                        <Label>Any Note?</Label>
                        <Input
                            value={goal.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                        />
                        <DialogFooter>
                            <Button onClick={handleSaveGoal}>Save goal</Button>
                        </DialogFooter>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Goals;
