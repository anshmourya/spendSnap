import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bill } from '../context/Bill';


const Doughnuts = () => {
    const { expenseData } = useContext(Bill);

    // Check if expenseData is available and has category information
    if (!expenseData || !expenseData.category || expenseData.category.length === 0) {
        return null; // Handle the case when data is not available
    }

    // Extract category names and totals for the Doughnut chart
    const categoryNames = expenseData.category.map((category) => category.name);
    const categoryTotals = expenseData.category.map((category) => category.total);

    const data = {
        labels: categoryNames,
        datasets: [
            {
                data: categoryTotals,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />;
};

export default Doughnuts;
