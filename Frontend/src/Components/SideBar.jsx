import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import ChatLoading from '../Components/ChatLoading'
import { ChatState } from '../Context/ChatProvider';

const SideBar = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
  const [loadingChat,setLoadingChat]=useState()


  const {user,setSelectedChat,chats,setChats}=ChatState()
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleSearch = async () => {
    if (!search) {
      console.log('Nothing in search');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/user?search=${search}`);
      console.log(data);
      
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results', error);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {

    console.log(userId,'here immmmmmm');
    
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        '/chat/create-chat',
        { userId },
        {
          headers: {
            'Content-Type': 'application/json', // Specify Content-Type
          },
        }
      );

      console.log(data);
      
      
      setSelectedChat(data);
      setLoadingChat(false);
      closeSidebar();
    } catch (error) {
      console.error('Error accessing chat:', error);
      setLoadingChat(false);
    }
  };
  

  const openSidebar = () => {
    setIsSidebarOpen(true); // Open the sidebar
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isSidebarOpen ? 0 : '-300px', // Slide in/out animation
          width: '300px',
          height: '100%',
          background: 'lightgray',
          transition: 'left 0.3s ease-in-out',
          padding: '20px',
          boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        }}
      >
        <div>
          <h3>Sidebar</h3>
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '90%', marginBottom: '10px' }}
          />
          <button onClick={handleSearch}>Search</button>
<div>
{ loading ? <ChatLoading/>:
            searchResult?.map(user=>{
               return <li style={{background:'gray'}} key={user._id }
                    user={user}
                    onClick={()=>accessChat(user._id)}
                >{user.Name} :{user.Email}</li>

            })
          }
</div>
     
        </div>
        <button onClick={closeSidebar} style={{ marginTop: '20px' }}>
          Close Sidebar
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'blue',
          width: '100%',
          height: '50px',
          padding: '10px',
        }}
      >
        <button onClick={openSidebar} style={{ background: 'white', color: 'blue' }}>
          Open Sidebar
        </button>
        <p>HeyYou</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default SideBar;
