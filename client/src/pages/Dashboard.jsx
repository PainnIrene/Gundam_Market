import React,{useState,useEffect} from 'react'
import UpdatePost from '../components/UpdatePost';
import { CreatePost } from '../components'

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
            const response = await fetch('https://gundam-market-be-painhoangtran-gmailcom.vercel.app/post/posts', {
           // const response = await fetch('http://localhost:5000/post/posts', {
    
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
           const result = await response.json();

            setPosts(result.data);
           // window.location.reload();
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
            const response = await fetch(`https://gundam-market-be-painhoangtran-gmailcom.vercel.app/post/delete/${id}`, {
      
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
    <div>
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
          <a
             onClick={handleCreatePostClick}

            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"

          >
            Create
          </a>
          <div className="fixed inset-x-0 top-0">
          {activeEditRow===post._id&& <UpdatePost post={post}/>}
          {showCreatePostForm && <CreatePost setCreatePostForm={setCreatePostForm} />}

          </div>


        </td>
      </tr>
      
    ))}

    </tbody>

  </table>
  
</div>
</div>

  )
}
export default Dashboard