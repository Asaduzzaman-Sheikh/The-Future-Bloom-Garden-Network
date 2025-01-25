import React from 'react'
import { Link } from 'react-router-dom'
import category1 from '../../assets/images//flowers.png'
import category2 from '../../assets/images/fruits.png'
import category3 from '../../assets/images/vegetables.png'
import category4 from '../../assets/images/medicinal.png'
const Categories = () => {
    const categories = [{
        name:'Flowers', path:'flowers', image:category1},
        {name:'Fruits', path:'fruits', image:category2},
        {name:'Vegetables', path:'vegetables', image:category3},
        {name:'Medicinal ', path:'medicinal-plants', image:category4},
    ]
  return (
    <>
        <div className='product__grid'>
            {
                categories.map((category)=>(
                    <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                        <img src={category.image} alt={category.name} />
                        <h4>{category.name}</h4>
                    </Link>
                ))
            }
        </div>
    </>
  )
}

export default Categories