import React from 'react'
import dealsImage from '../../assets/images/deals.png'

const DealSection = () => {
    
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealsImage} alt="deals image" style={{ width: '400px', height: '500px' }} />
        </div>

        <div className='deals__content'>
            <h5>Get Up To 20% Discount</h5>
            <h4>Deals Of This Month</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores laborum, vel quasi sapiente quibusdam atque adipisci corporis. Labore, nam quia. Cumque, ad. Quaerat!</p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>27</h4>
                    <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>17</h4>
                    <p>Mins</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>07</h4>
                    <p>Secs</p>
                </div>
                   
                
            </div>
        </div>
    </section>
  )
}

export default DealSection