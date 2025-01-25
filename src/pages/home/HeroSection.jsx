import React from 'react'
import card1 from '../../assets/images/card1.png'
import card2 from '../../assets/images/card2.png'
import card3 from '../../assets/images/card3.png'

const cards = [
    {
        id: 1,
        image: card1,
        trend:'2024 Trending',
        title: 'Winter Fruits',  
        
    },
    {
        id: 2,
        image: card2,
        trend:'2024 Trending',
        title: 'Winter Flowers',  
        
    },
    {
        id: 3,
        image: card3,
        trend:'2024 Trending',
        title: 'Summer Flowers',
    }
]
const HeroSection = () => {
  return (
    <section className='section__container hero__container'>{cards.map((card)=>(<div key={card.id} className='hero__card'>
      <img src={card.image} alt="products image" className='max-h-full md:h-64 w-full'/>
      <div className='hero__content'>
        <p>{card.trend}</p>
        <h4>{card.title}</h4>
        <a href="#">Discover More</a>
      </div>
    </div>))}</section>
  )
}

export default HeroSection