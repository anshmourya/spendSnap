import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Bill } from '../context/Bill';

const Bars = () => {
    const { expenseData } = useContext(Bill);

    // Check if expenseData is available and has list information
    if (!expenseData || !expenseData.list || expenseData.list.length === 0) {
        return null; // Handle the case when data is not available
    }

    // Extract month names and total expenses for the Bar chart
    const monthNames = expenseData.list.map((item) => item.name);
    const monthlyExpenses = expenseData.list.map((item) => item.price);

    const data = {
        labels: monthNames,
        datasets: [
            {
                label: 'Monthly Expenses',
                data: monthlyExpenses,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default Bars;
