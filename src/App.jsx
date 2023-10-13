import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import {AuthProvider} from './components/Context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import WishlistContextProvider from './components/Context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetCode from './components/ResetCode/ResetCode';


const myRouter=createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {path:"",element:
    <ProtectedRoute>
    <Products/>
    </ProtectedRoute>
 },
    {path:"products",element:
    <ProtectedRoute>
    <Products/>
    </ProtectedRoute>
    },
    {path:"prddetails/:id",element:
    <ProtectedRoute>
    <ProductDetails/>
    </ProtectedRoute>
    },
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"brands",element:<Brands/>},
    {path:"profile",element:
    <ProtectedRoute>
    <Profile/>
    </ProtectedRoute>
    }, 
    {path:"payment",element:
    <ProtectedRoute>
    <Payment/>
    </ProtectedRoute>
    },
    {path:"allorders",element:
    <ProtectedRoute>
    <AllOrders/>
    </ProtectedRoute>
    }, 
    {path:"cart",element:
    <ProtectedRoute>
    <Cart/>
    </ProtectedRoute>
    },
    {path:"wishlist",element:
    <ProtectedRoute>
    <Wishlist/>
    </ProtectedRoute>
    },
    {path:"forgetpassword",element:
    <ForgotPassword/>
    },
    {path:"resetcode",element:
   
    <ResetCode/>
    },
    {path:"categories",element:<Categories/>},
    {path:"*",element:<NotFound/>},
  ]}
])

export default function App() {

let cq = new QueryClient();

  return <>
  <QueryClientProvider client={cq}>
   
  <CartContextProvider>

  <WishlistContextProvider>

  <AuthProvider>
  <RouterProvider router={myRouter}/>
  </AuthProvider>

  </WishlistContextProvider>
  
  </CartContextProvider>
  <Toaster/>

  </QueryClientProvider>
  

  </>
}

// export default App;
