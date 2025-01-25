import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
        <footer className='section__container footer__container'>
            <div className='footer__col'>
                <h4>CONTACT INFO</h4>
                <p>
                    <span><i className='ri-map-pin-2-fill'></i></span>
                    1230, Dakshinkhan, Uttara, Dhaka
                </p>
                <p>
                    <span><i className='ri-phone-fill'></i></span>
                    017******** / 019********
                </p>
                <p>
                    <span><i className='ri-mail-fill'></i></span>
                    email@gmail.com   
                </p>
            </div>

            <div className='footer__col'>
                <h4>COMPANY</h4>
                <ul>
                    <a href='/'>Home</a>
                    <a href='/'>About</a>
                    <a href='/'>Work With Us</a>
                    <a href='/'>Terms and Conditions</a>
                </ul>
            </div>
            <div className='footer__col'>
                <h4>USEFUL LINK</h4>
                <ul>
                    <a href='/'>Help</a>
                    <a href='/'>Track your product</a>
                    <a href='/'>Plants</a>
                </ul>
            </div>

        </footer>

        <div className='footer__bar'>
            <p>© {currentYear} All Rights Reserved. Developed by BLooooM
            </p>
        </div>
    </>
  )
}

export default Footer