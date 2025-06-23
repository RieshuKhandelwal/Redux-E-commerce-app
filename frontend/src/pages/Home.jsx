import React from 'react';

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        color: 'var(--pri)',
      }}
    >

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-16 rounded-xl shadow-2xl bg-[rgba(11,29,81,0.85)] mb-10 mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[var(--t3)] drop-shadow-lg text-center">
        <span className="text-[var(--t3)]">Redux Shop</span>
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-[var(--pri)] text-center max-w-2xl">
          Your one-stop solution to explore products, manage your cart, and experience seamless shopping with <span className="text-[var(--t2)] font-semibold">React</span> & <span className="text-[var(--t1)] font-semibold">Redux</span>.
        </p>
        <a
          href="/products"
          className="px-8 py-3 rounded-full bg-[var(--t1)] text-[var(--sec)] font-bold text-lg shadow-lg hover:bg-[var(--t2)] hover:text-[var(--pri)] transition"
        >
          Start Shopping
        </a>
      </section>

      {/* How It Works */}
      <section className="relative z-10 bg-[rgba(255,255,255,0.07)] rounded-xl shadow-xl px-8 py-10 mb-10 max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-[var(--t3)] text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[var(--t1)] flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">1</div>
            <h3 className="text-xl font-semibold mb-1 text-[var(--t1)]">Browse Products</h3>
            <p className="text-[var(--pri)] text-center opacity-80">Explore a wide range of products on the Products page.</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[var(--ter)] flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">2</div>
            <h3 className="text-xl font-semibold mb-1 text-[var(--ter)]">Add to Cart</h3>
            <p className="text-[var(--pri)] text-center opacity-80">Add your favorite items to your cart with a single click.</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[var(--t3)] flex items-center justify-center text-2xl font-bold mb-2 shadow-lg text-[var(--sec)]">3</div>
            <h3 className="text-xl font-semibold mb-1 text-[var(--t3)]">Manage your cart</h3>
            <p className="text-[var(--pri)] text-center opacity-80">Review your cart, adjust quantities ans save them for futher visit.</p>
          </div>
        </div>
      </section>

      {/* About / Contact Section */}
      <section className="relative z-10 bg-[rgba(11,29,81,0.85)] rounded-xl shadow-xl px-8 py-8 mb-10 max-w-2xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-[var(--t1)]">About This App</h2>
        <p className="text-[var(--pri)] text-center mb-4 opacity-90">
          This demo e-commerce app is built with <span className="text-[var(--t2)] font-semibold">React</span> and <span className="text-[var(--t1)] font-semibold">Redux</span> for state management. It demonstrates authentication, product browsing, cart management, and a modern UI.
        </p>
        <a
          href="mailto:your.email@example.com"
          className="mt-2 px-6 py-2 rounded-full bg-[var(--t3)] text-[var(--sec)] font-semibold shadow hover:bg-[var(--t1)] hover:text-[var(--pri)] transition"
        >
          Contact Developer
        </a>
      </section>

    </div>
  );
};

export default Home;