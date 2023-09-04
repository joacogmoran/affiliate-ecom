import React from "react"

// routing
import {
	RouterProvider, createBrowserRouter,
	createRoutesFromElements, Route
} from 'react-router-dom';

// redux
import {Provider} from 'react-redux';
import store from './store/store';


// middlewares
import Session from './SpecialRoutes/session/Session';
import Authentication from './SpecialRoutes/authentication/Authentication';

// screen
import Screen from './components/Screen/Screen';

// auth pages
import Login from './pages/auth/Login/Login';
import Signup from './pages/auth/Signup/Signup';

// pages
import Home from './pages/main/Home/Home';
import Profile from './pages/main/Profile/Profile';
import Create from "./pages/main/Create/Create";

// subpages
import EditProfile from './pages/subpages/EditProfile/EditProfile';
import EditProduct from "./pages/subpages/EditProduct/EditProduct";
import ProductDetail from './pages/subpages/ProductDetail/ProductDetail';




// code
export default function App () {
	return <Provider store={store}>
		<RouterProvider router={router}/>
	</Provider>
};

// app
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Screen/>}>
				
			{/* sign in / up*/}
			<Route path='' element={<Login/>}/>
			<Route path='signup' element={<Signup/>}/>

			<Route element={<Session/>}>
			
				{/* pages */}
				<Route path=':user_name'>

					{/* main pages */}
					<Route path='' element={<Home/>}/>
					<Route path='profile' element={<Profile/>}/>

					{/* required auth */}
					<Route element={<Authentication/>}>
						<Route path='create' element={<Create/>}/>
						
						{/* subpages */}
						<Route path='edit/profile' element={<EditProfile/>}/>
						<Route path='edit/product/:productId' element={<EditProduct/>}/>
					</Route>

					{/* subpages */}
					<Route path='product/detail/:productId' element={<ProductDetail/>}/>
					
				</Route>

			</Route>
		</Route>
	)
);
