import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdatePost = ({post}) => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const handleHideForm = () => {
    setIsFormVisible(false);
    //update
    window.location.reload();
  };

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    photo: '',
  });
  useEffect(()=>{
    if(post){
        setForm({
            name:post.name,
            description:post.description,
            price:post.price,
            photo:post.photo
        })
    }

  },[])
//convert file

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setForm({ ...form, photo: `${base64}` });

    };
    reader.readAsDataURL(file);

  }
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
       
         const response = await fetch(`https://gundam-market-git-master-painhoangtran-gmailcom.vercel.app/post/update/${post._id}`, {
       //  const response = await fetch(`http://localhost:5000/post/update/${post._id}`, {

          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Update Successful');
        window.location.reload();
      } catch (err) {
        alert(err);
      } finally {
      }
    } 


  return (
    <div>

        {isFormVisible &&(
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white justify-items-end">
              {/*Close Button*/ }
              <button 
  type="button" onClick={handleHideForm}
  className="mr-20 dark:bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
>
  <svg
    className="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>
              {/*Close Button*/ }
              Update Post

            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Unicorn Gundam"
                  required=""
                  type="text"
                  value={form.name}
                  onChange ={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Describe Here "
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={form.description}
                  onChange ={handleChange}

                />
              </div>
              
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="100"
                  required=""
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
                    dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange ={handleFileChange}
                />
                
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
        )}
    </div>
  );
}


export default UpdatePost;
