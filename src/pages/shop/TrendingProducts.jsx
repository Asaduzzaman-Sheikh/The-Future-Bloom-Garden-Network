import React from 'react'
import ProductsCard from './ProductsCard'
import  products  from '../../data/products.json'

const TrendingProducts = () => {
    const[visibleProducts, setVisibleProducts] = React.useState(8)
    const showMoreProducts = () => {
        setVisibleProducts(prevValue => prevValue + 4)
    }
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Most Selling Plants</h2>
        <p className='section__subheader mb-12'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. amet consectetur, adipisicing elit.</p>

        {/* products card */}
        <div className='mt-12'>
        <ProductsCard  products={products.slice(0, visibleProducts)} />
        </div>
        {/* Load more products button */}
        <div className='product__btn'>
          {
            visibleProducts < products.length && <button onClick={showMoreProducts} className='btn btn__primary'>Load More</button>
          }
        </div>
    </section>
  )
}

export default TrendingProducts