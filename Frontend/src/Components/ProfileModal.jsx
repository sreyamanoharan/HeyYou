import React, { useState } from 'react';

const ProfileModal = ({ user, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  console.log(user,'profile modal');
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {children ? (
        <span onClick={toggleModal} style={{ cursor: 'pointer', color: 'blue' }}>
          {children}
        </span>
      ) : (
        <button onClick={toggleModal}>open modal</button>
      )}

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              position: 'relative',
              width: '400px',
              textAlign: 'center',
            }}
          >
            <h2>{user.Name}</h2>
            <img src={user.Profilepicture} alt="" />
            <p>Email: {user?.Email || 'Not provided'}</p>
          

            <button
              onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
