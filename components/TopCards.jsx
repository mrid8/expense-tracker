import React from 'react'

const TopCards = () => {
  return (
    <div className='grid lg:grid-cols-6 gap-4 p-4'>
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4 items-center'>
            <p className='text-2xl font-bold'>$4,500</p>
            <p className='text-gray-600'>Income</p>
        </div>
        {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+18%</span>
        </p> */}
    </div>
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4 items-center'>
            <p className='text-2xl font-bold'>$2,342</p>
            <p className='text-gray-600'>Expenses</p>
        </div>
        {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+9%</span>
        </p> */}
    </div>
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4 items-center'>
            <p className='text-2xl font-bold'>$2,158</p>
            <p className='text-gray-600'>Balance</p>
        </div>
        {/* <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+14%</span>
        </p> */}
    </div>
    </div>
  )
}

export default TopCards