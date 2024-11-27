import React from 'react'

const UserList = ({user,handleFunction }) => {

  console.log(user.Name, 'handlesearhc....................');
  

  return (
    <div>
        <div onClick={handleFunction}>
        <p>{user.Name}</p>
        <p>{user.Email}</p>
        </div>
    </div>
  )
}

export default UserList