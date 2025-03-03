'use client'

import React, { useState } from 'react';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className='max-w-[1200px] mx-auto p-6  min-h-screen relative'>
      <nav className='flex items-center py-4 justify-between bg-white shadow-md px-6 rounded-lg'>
        <h1 className='text-2xl font-bold text-gray-800'>Tasks</h1>
        <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Logout</button>
      </nav>
      <div className='mt-6 bg-white p-6 shadow-lg rounded-lg'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-blue-500 text-white'>
              <th className='py-3 px-4 text-left'>Day</th>
              <th className='py-3 px-4 text-left'>Work</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b hover:bg-gray-100' onClick={() => setIsViewModalOpen(true)}>
              <td className='py-2 px-4'>Monday</td>
              <td className='py-2 px-4'>Project Meeting</td>
            </tr>
            <tr className='border-b hover:bg-gray-100' onClick={() => setIsViewModalOpen(true)}>
              <td className='py-2 px-4'>Tuesday</td>
              <td className='py-2 px-4'>Coding Session</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        className='fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-600 transition'
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform scale-100 transition-transform duration-200 ease-out'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>Add Task</h2>
            <input
              type='text'
              placeholder='Day'
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className='w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100'
            />
            <input
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100'
            />
            <div className='flex justify-end space-x-2'>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform scale-100 transition-transform duration-200 ease-out'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>View Task</h2>
            <p className='text-gray-700'>Today I make a full stack app with Node.js and Express.</p>
            <div className='flex justify-end mt-4'>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;