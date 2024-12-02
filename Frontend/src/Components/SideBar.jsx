import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import ChatLoading from '../Components/ChatLoading';
import { ChatState } from '../Context/ChatProvider';
import UserList from './UserList';
import ProfileModal from './ProfileModal';
import CloseIcon from '@mui/icons-material/Close'

const SideBar = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Profile menu toggle

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      console.log('Nothing in search');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/user?search=${query}`);
      console.log(data);

      setSearchResult(data);
      console.log(searchResult);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results', error);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        '/chat/create-chat',
        { userId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      closeSidebar();
    } catch (error) {
      console.error('Error accessing chat:', error);
      setLoadingChat(false);
    }
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isSidebarOpen ? 0 : '-340px',
          width: '300px',
          height: '100%',
          background: 'black',
          transition: 'left 0.3s ease-in-out',
          padding: '20px',
          boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: '90%', marginBottom: '10px' , borderRadius:'10px', height:'20px' ,marginTop:'50px'}}
          />
          {/* <button onClick={handleSearch} style={{background:'red', borderRadius:'20px'}}>Search</button> */}
          <div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id);
                  }}
                />
              ))
            )}
          </div>
        </div>
        {/* <button onClick={closeSidebar} style={{ marginTop: '20px', background:'red', borderRadius:'10px' }}>
          Close Sidebar
        </button> */}

        <CloseIcon 
    style={{ 
      position: 'absolute', 
      top: '5px', 
      right: '10px', 
      cursor: 'pointer', 
      color: 'white',
      backgroundColor:'red',
      borderRadius:'10px'
    }} 
    onClick={closeSidebar} 
  />
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
        {/* <button onClick={openSidebar} style={{ background: 'white', color: 'blue' }}>
          Open Sidebar
        </button> */}

        <input type="text" placeholder='search'  onClick={openSidebar} style={{ background: 'white', color: 'blue', borderRadius:'10px', paddingLeft:'10px'}} />
        <p style={{ color: 'white' }}>HeyYou</p>

        {/* Profile Section */}
        <div style={{ position: 'relative' }}>
          <img
            src={user?.Profilepicture}
            alt=""
            onClick={toggleProfileMenu}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              border: '2px solid white',
              marginRight:'15px'
            }}
          />
          {isProfileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                background: 'white',
                border: '1px solid lightgray',
                borderRadius: '5px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                zIndex: 100,
              }}
            >
              <ProfileModal user={user}>
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                Profile
              </button>
              </ProfileModal>
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
