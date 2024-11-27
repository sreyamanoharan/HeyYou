import React from 'react'

const UserBadge = ({user,handleFunction}) => {

    console.log(user.Name,'bagde entersssss');
    
  return (
    <>
    <div style={{color:'red', display:'flex'}}>
    
    
    <p>{user.Name}</p>
    <button onClick={handleFunction}>*</button>
    </div>
    </>
  )
}

export default UserBadge