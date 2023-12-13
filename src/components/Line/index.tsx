import React from 'react'
import { Line } from 'react-chartjs-2';

const Lines = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },

        ]
    };
    // const options = {
    //     scales: {
    //         y: {
    //             beginAtZero: true,
    //         }
    //     }
    // };


    return (
        <Line data={data} width="100%" height="100%" />
    )
}

export default Lines