import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductsCard from '../shop/ProductsCard'
import { use } from 'react'

const CategorPage = () => {
  const { categoryName } = useParams()
  // console.log(categoryName)]
  const [category, setCategory] = useState([])
  useEffect(()=>{
    const fetchCategory = products.filter((product)=> product.category === categoryName.toLocaleLowerCase())
    setCategory(fetchCategory)
  },[categoryName])
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae culpa vero, omnis possimus corporis, rerum harum delectus soluta quo mollitia dolorem quidem perferendis? Repellat nulla est excepturi porro delectus.</p>
      </section>

      {/* products card */}
      <div className='section__container'>
        <ProductsCard products={category} />
      </div>

    </>
  )
}

export default CategorPage