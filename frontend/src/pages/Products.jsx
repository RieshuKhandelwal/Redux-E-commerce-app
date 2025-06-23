import React, { use, useState } from 'react'
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteProducts } from '../utils/useInfiniteProducts';

const Products = () => {
  
  const [search, setSearch] = useState('');

  // customize hook "useInfiniteProducts" made by us 😁 , it does not return UI (unlike, our components return HTML or UI);
  const {products,hasMore,fetchProducts} = useInfiniteProducts();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  //Why does this show all products when search is empty? 
  //Beacuse in JavaScript, every string includes the empty string: for example, "anything".includes("") // true.
  //So, when the search is empty, it matches all products.

  const renderProducts = filteredProducts.map((product) => (
    <div key={product.id} className='bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all'>
      <img 
        src={product.image} 
        alt={product.title}
        className='w-full h-64 object-cover hover:scale-105 transition-transform duration-300 object-top'
      />
      <div className='p-6'>
        <div className='flex justify-between items-center mb-4'>  
          <h2 className='text-xl font-semibold truncate'>{product.title}</h2>
          <span className='text-green-400 font-bold'>${product.price}</span>
        </div>
        <p className='text-gray-400 text-sm mb-4 line-clamp-2'>{product.description.slice(0,100)}..</p>
        <span className='px-3 py-1 bg-gray-700 text-sm rounded-full'>
          {product.category}
        </span>
        <Link to={`/products/${product.id}`} className="mt-5 px-3 py-1 w-fit bg-blue-500 text-sm rounded-full block cursor-pointer">More Info</Link>
      </div>
    </div>
  ))
  return products.length > 0 ? (
    <div className='w-full min-h-screen bg-gray-900 text-white p-8'>
      {/* Flex container for H1 and search bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-white text-5xl text-center md:text-left">Our Products</h1>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search products by name or category"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[var(--t1)] text-[var(--t3)] w-full md:w-80 focus:outline-none"
        />
      </div>
      <div className='w-full'>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore} // set false if you don't have more data
          loader={<h4 className='text-center text-white'>Loading...</h4>}
          endMessage={
            <p className='text-center text-gray-400 mt-5'>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className='max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
            {renderProducts}
          </div>
        </InfiniteScroll>
      </div>
    </div>)
  :
  (
    <div className='w-full min-h-screen bg-gray-900 text-white flex items-center justify-center'>
      <h1 className='text-3xl font-bold'>Loading...</h1>
    </div>
  )
}

export default Products
