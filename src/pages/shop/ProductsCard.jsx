import React from 'react'
import { Link } from 'react-router-dom'
import RatingStar from '../../components/RatingStar'
import { useDispatch } from 'react-redux'
import { increment } from '../../redux/features/cart/cartSlice'

const ProductsCard = ({ products }) => {
    // console.log(products)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        console.log('Adding product to cart:', product)
        dispatch(increment(product))
    }   
  return (
    <div className='grid gri-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {
            products.map((product, index)=>(
                <div key={index} className='product__card'>
                    <div className='relative'>
                        <Link to={`/shop/${product._id}`}>
                            <img src={product.image} alt="product image" className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-grey-500/50' />
                        </Link>
                        <div className='hover:block absolute top-3 right-3'>
                            <button onClick={(e)=>{

                                e.stopPropagation()
                                handleAddToCart(product)
                            }}>
                                <i className='ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark'></i>
                            </button>
                        </div>
                    </div>

                    {/* product description */}
                    <div className='product__card__content'>
                        <h4>{product.name}</h4>
                        <p>${product.price} {product?.oldPrice ? <s>${product.oldPrice}</s> : null}</p>
                        <RatingStar rating={product.rating}/>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ProductsCard