import React from 'react'
import { useSelector } from 'react-redux'

export const OredSummary = () => {
    const products = useSelector((store)=> store.cart.products)
    const {
        selectedItems,
        totalAmount,
        tax,
        taxRate,
        grandTotal,} = useSelector((store)=> store.cart)
  return (
    <div className='bg-primary-light mt-5 rounded text-base'>
        <div className='px-6 py-4 space-y-5'>
            <h2 className='text-xl text-dark'>Order Details</h2>
            <p className='text-text-dark mt-2'>Selected Item(s):{selectedItems} </p>
            <p>Total Price: ${totalAmount.toFixed(2)}</p>
            <p>Tax ({taxRate * 100}%:${tax.toFixed(2)})</p>
            <h3 className='font-bold'>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <div className='px-4 mb-6'>
                <button className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'><span className='mr-2'>Clear Cart</span> <i className='ri-delete-bin-7-line'></i></button>
                <button className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'><span className='mr-2'>Go to Payment</span> <i className='ri-bank-card-line'></i></button>
            </div>
        </div>
    </div>
  )
}
