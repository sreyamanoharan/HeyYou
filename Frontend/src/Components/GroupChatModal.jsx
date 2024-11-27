import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import axios from '../axios'
import UserBadge from './UserBadge';
import UserList from './UserList';


const GroupChatModal = ({ closeModal }) => {
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)



  const {user,chats,setChats}=ChatState()

    const handleSearch=async(query)=>{

        setSearch(query)
        if(!query){
            return 
            
        }
        try {
            setLoading(true)

            const {data}=await axios.get(`/user?search=${search}`,{
                headers: {
                  'Content-Type': 'application/json', // Specify Content-Type
                },
              })
         
              setLoading(false)
              setSearchResult(data)
              
        } catch (error) {
            console.log('failed to load the');
            
        }
    }


    const handleSubmit=async ()=>{
  
      if(!groupChatName || !selectedUsers){
        console.log('please fill the fields');
        return
      }

     try {
      const {data}= await axios.post('/chat/create-group',{
        name:groupChatName,
        users:selectedUsers.map((user)=>user._id)
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setChats([data,...chats])
      closeModal()
     } catch (error) {
      
     }
    
  };

  const handleDelete=(delUser)=>{
    console.log('happeming deletion.....');
    
      setSelectedUsers(selectedUsers.filter((sel)=>sel._id!==delUser._id))
  }


  const handleGroup=(userToAdd)=>{
    
    if(selectedUsers.includes(userToAdd)){
      console.log('already added');
      return
    }
     setSelectedUsers([...selectedUsers,userToAdd])
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Group</h2>
   <form>
    <input type="text" name="" placeholder='Chat Name' onChange={(e) => setGroupChatName(e.target.value)}  />
   </form>
        <input 
          type="text" 
          placeholder="add users.." 
          onChange={(e)=>handleSearch(e.target.value)}
          
        />
        {selectedUsers.map(user=>(
          <UserBadge key={user._id} user={user} handleFunction={()=>handleDelete(user)}/>


            
        ))}

        {loading? <div>loading</div>:(
            searchResult?.slice(0,4).map(user=>(
                <UserList user={user} handleFunction={()=>handleGroup(user)}/>
            ))
        )}

        <button onClick={handleSubmit}>create group</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
export default GroupChatModal;
