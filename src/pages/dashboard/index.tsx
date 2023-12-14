import React, { useContext } from 'react';
import NavBar from '../../components/navbar';
import Card from '../../components/card';
import { Separator } from '../../components/ui/separator';
import Bars from '../../bar';
import Doughnuts from '../../doughnut';
import DataTable from '../../dataTable';
import { Bill } from '../../context/Bill';
import { getHighestCategory } from '../../helper';
import GoalList from '../../goalList';

const Dashboard = () => {
  const { expenseData } = useContext(Bill);

  // Ensure expenseData is available before accessing its properties
  const totalSpending = expenseData?.total || 0;
  const highestCategory = getHighestCategory(expenseData?.category) || {};

  return (
    <>
      <NavBar />

      <div className='container flex flex-wrap justify-around gap-10 my-9'>
        <Card head="your total spending" total={totalSpending} />
        <Card head={`highest spent on ${highestCategory.name}`} total={highestCategory.total} />
        <GoalList />
        {/* Add other cards as needed */}
      </div>
      <Separator />
      <div className='container'>
        <DataTable />
      </div>

      <div className='container flex flex-wrap items-end justify-between gap-10 m-auto mt-20'>
        <div className='w-1/3 min-w-[300px]'> <Doughnuts /></div>
        <div className='w-1/3 min-w-[300px]'> <Bars /></div>
      </div>
    </>
  );
};

export default Dashboard;
