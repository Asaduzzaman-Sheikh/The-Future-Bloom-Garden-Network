import React from 'react'

export const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span>
                <i className='ri-truck-line'></i>
                <h4>Free Delivaery</h4>
                <p className='text-sm'>Lorem ipsum dolor, sit amet mque? Ipsam quam  Rerum?</p>

            </span>
        </div>

        <div className='banner__card'>
            <span>
                <i className='ri-money-dollar-circle-line'></i>
                <h4>Money Back Guarantee</h4>
                <p className='text-sm'>Lorem ipsum dolor, sit amet mque? Ipsam quam  Rerum?</p>

            </span>
        </div>

        <div className='banner__card'>
            <span>
                <i className='ri-user-voice-fill'></i>
                <h4>Strong Support</h4>
                <p className='text-sm'> it amet mque? Ipsam quam  Rerum?</p>

            </span>
        </div>
    </section>
  )
}
