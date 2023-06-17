import React,{useState,useEffect} from 'react'
import UpdatePost from '../components/UpdatePost';
import { CreatePost } from '../components'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Dashboard() {
    //prevent multiple row have multiple editform
    const [activeEditRow, setActiveEditRow] = useState(null);
    const[showCreatePostForm,setCreatePostForm] = useState(false);
    const handleCreatePostClick = () => {
      setCreatePostForm(true);
    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetchPosts();
    }, []);
   
    const fetchPosts = async () => {
      try {
            const response = await fetch('https://gundam-market-git-master-painhoangtran-gmailcom.vercel.app/post/posts', {
           // const response = await fetch('http://localhost:5000/post/posts', {
    
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
           const result = await response.json();

            setPosts(result.data);
          }
        } catch (err) {
          alert(err);
        } finally {
        }
      };
      //delete

      const handleDeletePost = async (id) => {
        try {
           // const response = await fetch(`http://localhost:5000/post/delete/${id}`, {
            const response = await fetch(`https://gundam-market-git-master-painhoangtran-gmailcom.vercel.app/post/delete/${id}`, {
      
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              const result = await response.json();
        alert('Delete Successful');

             window.location.reload();
             
  
            }
          } catch (err) {
            alert(err);
          } finally {
          }
        };

  return (
    <div className="">
    //navigation
    <nav className="bg-white dark:bg-gray-900 fixed w-full max-h-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center">
        <img
          src={logo}
          className="h-8 mr-3"
          alt="Gundam Market"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Gundam Market
        </span>
      </a>
      <div className="flex md:order-2">
  
        <button 
          type="button" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleCreatePostClick}
      >
           Create Post 
        </button>
  
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a
              href="/"
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              About
            </a>
          </li>
          <li>
  
            <a
              href="/admin"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Admin
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      
    </div>
    
    <div className="fixed w-[100%]">
    {showCreatePostForm && <CreatePost setCreatePostForm={setCreatePostForm} />}

    </div>
    
  
  </nav>

  //navigation


   

   
   

    <div className="mt-11">

    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
         Name
        </th>
        <th scope="col" className="px-6 py-3">
          Description
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
  
    {posts.map((post) => (
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={post._id}>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
         {post.name}
        </th>
        <td className="px-6 py-4">{post.description}</td>
        <td className="px-6 py-4">$ {post.price}</td>
        <td>
<img src={post.photo} className="max-h-60 border-style: solid"/>

        </td>
        <td className="px-6 py-4 space-x-6" >
          <a
             onClick={() => setActiveEditRow(post._id)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"

          >
            Edit
          </a> 
          <a
             onClick={() => handleDeletePost(post._id)}

            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"

          >
            Delete
          </a>
        
          <div className="fixed inset-x-0 top-0">
          {activeEditRow===post._id&& <UpdatePost post={post}/>}
          </div>


        </td>
      </tr>
      
    ))}

    </tbody>

  </table>
  
</div>
</div>

</div>
  )
}
export default Dashboard