import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/images/banner1.png'

export const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>UP TO 20% DISCOUNT ON</h4>
            <h1>Winter Plants</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, corrupti animi. Nulla omnis totam accusamus nobis quam quo deserunt dignissimos sequi cumque expedita quaerat velit hic debitis, voluptate delectus nesciunt.</p>
            <button className='btn'>
                <Link to={"/shop"}>EXPLORE NOW</Link>
            </button>
        </div>
        <div className='header-img'>
            <img src={bannerImg} alt="plant" className='banner-image'/>
        </div>
    </div>

  )
}
