import React, { useContext } from 'react';
import NavBar from '../../components/navbar';
import Card from '../../components/card';
import { Separator } from '../../components/ui/separator';
import ImageInput from '../../components/imageInput';
import ImageAnalysis from '../../components/categorizeData';
import Lines from '../../components/Line';
import PieChart from '../../components/pieChart';
import Bars from '../../bar';
import Doughnuts from '../../doughnut';
import DataTable from '../../dataTable';
import { Bill } from '../../context/Bill';
import { getHighestCategory } from '../../helper';

const Dashboard = () => {
  const { expenseData } = useContext(Bill);

  // Ensure expenseData is available before accessing its properties
  const totalSpending = expenseData?.total || 0;
  const highestCategory = getHighestCategory(expenseData?.category) || {};

  return (
    <>
      <NavBar />

      <div className='container flex justify-around my-9'>
        <Card head="your total spending" total={totalSpending} />
        <Card head={`highest spent on ${highestCategory.name}`} total={highestCategory.total} />
        {/* Add other cards as needed */}
      </div>
      <Separator />
      <div className='container'>
        <DataTable />
      </div>
      {/* <div className='container flex justify-between gap-3'>
        <div className='w-1/3'> <Lines /></div>
        <div className='w-1/3'> <PieChart /></div>
        <div className='w-1/3'> <Lines /></div>
      </div> */}
      <div className='container flex items-end justify-between mt-20'>
        <div className='w-1/3'> <Doughnuts /></div>
        <div className='w-1/3'> <Bars /></div>
      </div>
    </>
  );
};

export default Dashboard;
