import React, {useState} from 'react'
import productData from "../../data/products.json"
import ProductsCard from '../shop/ProductsCard'

export const Search = () => {
    const [searchQuery, setSearchQuery] =useState('')
    const [searchResults, setSearchResults] = useState(productData)

    const handleSearch = () => {

        const query = searchQuery.toLowerCase()
        const filtered = productData.filter((product => product.name.toLocaleLowerCase().includes(query) || product.description.toLocaleLowerCase().includes(query)))
        setSearchResults(filtered)   
    }
  return (
    <>
        <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Search Products</h2>
        <p className='section__subheader'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae culpa vero, omnis possimus corporis, rerum harum delectus soluta quo mollitia dolorem quidem perferendis? Repellat nulla est excepturi porro delectus.</p>
      </section>
      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
            <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} className='search-bar w-full max-w-4xl p-2 border rounded' placeholder='Type Product Name... ' />
            <button onClick={handleSearch} className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>Search</button>
        </div>

        <ProductsCard products={searchResults} />
      </section>
    </>
  )
}
