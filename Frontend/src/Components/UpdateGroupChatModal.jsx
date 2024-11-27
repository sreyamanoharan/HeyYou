import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import UserBadge from '../Components/UserBadge';
import axios from '../axios'
import UserList from './UserList';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain,fetchChats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameloading] = useState(false);
  const [searchResult,setSearchResult]=useState([])

  const { user,selectedChat,setSelectedChat } = ChatState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRemove = async(user1) => {
    console.log('jjjjjookkkerrr');
    console.log(user,user1,'heyy wowwww ');
    
    if(selectedChat.groupAdmin._id !==user._id&&user1._id ==user._id){
      console.log('only admin can remove someOne');
      return
      
    }
    try {
      setLoading(true)
      const {data} =await axios.put('/chat/remove-group',{
        chatId:selectedChat._id,
        userId:user1._id
      },{
        headers:{
          'Content-Type':'application/json'
        }
      })
      user1._id===user._id? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchChats()
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleRename =async () => {
      console.log('hi rename grp');
      
    if(!groupChatName) return

    try {
      setRenameloading(true)
      const {data}=await axios.put('/chat/rename-group',{chatId:selectedChat._id , chatName:groupChatName},    {headers: {
        'Content-Type': 'application/json', // Specify Content-Type
      }})

      console.log(data,'updated grp name');
      
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameloading(false)
    } catch (error) {
      console.log('error',error);
      setRenameloading(false)
      
    }
    setGroupChatName('')
  
  };


  const handleSearch = async (query) => {
 
    setSearch(query)
    console.log(search,'hereeeeee');
    
    if (!query) {
     setSearchResult([])
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


  const handleAddUser=async(user1)=>{
    console.log('handleAdduser',user1);
    if(selectedChat.users.find((u)=>u._id===user1._id)){
      console.log('user already in the group');
      return
    }
    try {
      setLoading(true)
      const {data}=await axios.put('/chat/add-group',{
        chatId:selectedChat._id,
        userId:user1._id
      },   {headers: {
        'Content-Type': 'application/json', // Specify Content-Type
      }})
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)

    } catch (error) {
      
    }
  }


  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={toggleModal} style={{ cursor: 'pointer' }}>👁️</button>

      {/* Modal content */}
      {isModalOpen && (
        <div className="modal" style={styles.modalContainer}>
          <div className="modal-content" style={styles.modalContent}>
            <button onClick={toggleModal} style={styles.closeButton}>Close</button>

            <p>{selectedChat?.chatName}</p>

            <div>
              <h3>Group Members:</h3>
              {selectedChat?.users?.map((user) => (
                <UserBadge key={user._id} user={user} handleFunction={() => handleRemove(user)} />
              ))}
            </div>

            {/* Form container for proper alignment */}
            
            <form style={styles.formContainer}>
              <input
                type="text"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                style={styles.inputField}
                placeholder='new group name'
              />
              <button
               type='button'
                onClick={handleRename}
                style={styles.renameButton}
              >
                Rename
              </button>
            </form>
          

            <form style={styles.formContainer}>
              <input
                type="text"
                 value={search}  
                onChange={(e) => handleSearch(e.target.value)}
                style={styles.inputField}
                placeholder="Add user to group.."
              />
              
          
            </form>
         

            {loading? ( <p>loadingg...</p> ):(
              searchResult?.map((u)=>(
                <UserList key={user._id} user={u} handleFunction={()=>handleAddUser(u)}/>
              ))
            )}
          
          <div>
            <button onClick={()=>handleRemove(user)}>leave group</button>
          </div>

          </div>

          {/* Modal backdrop */}
          <div
            className="modal-backdrop"
            style={styles.modalBackdrop}
            onClick={toggleModal}
          ></div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1001,
    width: '400px',
    textAlign: 'center',
  },
  closeButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  inputField: {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  renameButton: {
    background: 'blue',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UpdateGroupChatModal;
