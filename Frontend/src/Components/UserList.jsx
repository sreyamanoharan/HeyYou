import React from 'react'

const UserList = ({user,handleFunction }) => {

  console.log(user.Name, 'handlesearhc....................');
  

  return (
    <div>
    <div 
      onClick={handleFunction} 
      style={{
        backgroundColor: 'black',
        color: 'white', // To make text readable
        border: '', // Adds a gray border
        borderRadius: '5px', // Optional: Smooth corners
        marginTop: '10px', // Keeps margin 
        display:"flex",
        padding:"2px"
      }}
    >

<img 
  src={user.Profilepicture} 
  alt="Profile" 
  style={{
    borderRadius: '50%', // Fully round shape
    height: '40px', // Consistent height
    width: '40px', // Consistent width
    marginTop: '5px', // Use `marginTop` instead of `paddingTop`
    marginLeft: '10px', // Use `marginLeft` instead of `paddingLeft`
    objectFit: 'cover', // Ensures the image scales well inside the container
  }} 
/>
      <p style={{marginLeft:'10px'}}>{user.Name}</p>
    
      </div>
    </div>

  
  )
}

export default UserList