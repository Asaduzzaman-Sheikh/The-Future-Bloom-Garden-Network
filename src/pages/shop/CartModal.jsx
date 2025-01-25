import React from 'react';
import { OredSummary } from './productDetails/OredSummary';

export const CartModal = ({ products, isOpen, onClose }) => {
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transition: 'opacity 300ms' }}
    >
      {/* Modal Content */}
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h4 className="text-xl font-semibold text-gray-800">
            Your Cart Details
          </h4>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="ri-close-fill text-2xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 cart-items">
          {products.length === 0 ? (
            <div className="text-gray-600">Your Cart Is Empty</div>
          ) : (
            products.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-4 border-b pb-2 flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5"
              >
                <span className="mr-4 px-2 text-white bg-primary rounded-full">
                  0{index + 1}
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div>
                  <h5 className="font-medium">{item.name}</h5>
                  <p className="text-gray-600 text-sm">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <div className='flex flex-row md:justify-start justify-end items-center mt-2'>
                    <button className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8'>-</button>
                    <span className='px-2 text-center mx-1'>{item.quantity}</span>
                    <button className='size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'>+</button>
                    <div className='ml-5'>
                        <button className='text-red-500 hover:text-red-800 mr-4'>Remove</button>
                    </div>
                </div>
              </div>
            ))
          )}
          {
            products.length > 0 && (
                <OredSummary/>
            )
          }
        </div>
      </div>
    </div>
  );
};
