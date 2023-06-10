import React from 'react'
import {BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import {Home} from './pages';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
<BrowserRouter>
<header>
</header>
<main className=" w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="admin" element={<Dashboard/>} />

   </Routes>
</main>

</BrowserRouter>

    )
}

export default App