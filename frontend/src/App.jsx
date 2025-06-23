import { useDispatch, useSelector } from 'react-redux';
import NavBar from "./components/NavBar"
import Mainroutes from "./routes/Mainroutes"
import { asyncGetLoggedInUser } from './store/actions/userActions';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { asyncGetAllCartItems } from './store/actions/cartActions';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.userReducer.users);
  const products = useSelector((state)=>state.productReducer.products);

  useEffect(()=>{
    !user && dispatch(asyncGetLoggedInUser());
  },[user]);

  useEffect(() => {
    dispatch(asyncGetAllCartItems());
    console.log("Fetching all cart items...");
  }, [user,dispatch]);

  //React's rule: If you use a variable from outside the useEffect (like dispatch), you should include it in the dependency array.
  // In practice, dispatch from useDispatch() never changes between renders, but including it is a best practice and avoids React warnings.
  // If you use ESLint, it will warn you if you don't include dispatch.

  return (
    <div
      className="min-h-screen min-w-full flex flex-col bg-gradient-to-br from-[var(--ter)] via-[var(--t2)] to-[var(--t1)]"
      style={{
        color: 'var(--pri)',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        letterSpacing: '0.01em',
      }}
    >
      {/* Global video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
      >
        <source src="./videos/bg_video_1.mp4" type="video/mp4" />
      </video>
      {/* App content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <header className="text-center my-10">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-2"
            style={{ color: 'var(--t3)', textShadow: '0 2px 8px var(--sec)' }}
          >
            Welcome to <span style={{ color: 'var(--t1)' }}>Redux Application</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--pri)] opacity-80 max-w-2xl mx-auto">
            Explore products, manage your cart, and enjoy a seamless modern web experience built with <span style={{ color: '#0f1835', fontWeight: 900,fontSize:'1.5rem' }}>React</span> and <span style={{ color: 'var(--t1)', fontWeight: 800,fontSize:'1.5rem' }}>Redux</span>.
          </p>
        </header>
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<div className="text-center text-2xl mt-10 text-[var(--t3)]">Loading...</div>}>
            <Mainroutes />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;