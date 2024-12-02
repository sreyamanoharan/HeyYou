// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Login from '../Components/Login';
// import Register from '../Components/Register';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const [tabValue, setTabValue] = useState(0); // Track the selected tab
//   const navigate = useNavigate();

//   // Redirect to the chat page if the user is already logged in
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('userInfo'));
//     if (user) {
//       navigate('/chats');
//     }
//   }, [navigate]);

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center">
//       Tab Selector
//       <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '16px' }}>
//         <Tabs value={tabValue} onChange={handleTabChange} centered>
//           <Tab label="Login" />
//           <Tab label="Register" />
//         </Tabs>
//       </Box>

//       {/* Conditional Rendering of Components */}
//       <div style={{ marginTop: '20px', width: '100%' }}>
//         {tabValue === 0 && <Login />} {/* Show Login component when tabValue is 0 */}
//         {tabValue === 1 && <Register />} {/* Show Register component when tabValue is 1 */}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
