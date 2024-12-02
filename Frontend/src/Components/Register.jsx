import { TextField, Button } from '@mui/material';
import axios from '../axios';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


function Register() {
  const initialState = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Profilepicture: '',
    PhoneNumber: '',
  };

  const [user, setUser] = useState(initialState);
  const [err, setErr] = useState({});
  const navigate = useNavigate();

  const regex_password = /^(?=.*[a-z])(?=.*[0-9]){5,12}/;
  const regex_mobile = /^\d{10}$/;
  const nameRegex = /^[a-zA-Z]+$/;

  function singUp(e) {
    e.preventDefault();
    const errors = {};

    if (!user.Name.trim()) {
      errors.Name = 'Name is required.';
    } else if (!nameRegex.test(user.Name)) {
      errors.Name = 'Invalid name format. Only letters are allowed.';
    }

    if (!user.Email.trim()) {
      errors.Email = 'Email is required.';
    }

    if (!user.PhoneNumber.trim()) {
      errors.PhoneNumber = 'Phone number is required.';
    } else if (!regex_mobile.test(user.PhoneNumber)) {
      errors.PhoneNumber = 'Invalid phone number. Must be 10 digits.';
    }

    if (!user.Password) {
      errors.Password = 'Password is required.';
    } else if (!regex_password.test(user.Password)) {
      errors.Password = 'Password must be 8-16 characters, with uppercase, lowercase, and a number.';
    }

    if (!user.ConfirmPassword) {
      errors.ConfirmPassword = 'Confirm Password is required.';
    } else if (user.Password !== user.ConfirmPassword) {
      errors.ConfirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setErr(errors);
    } else {
      setErr({});
      handleSubmit();
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'HeyYou');
    data.append('cloud_name', 'ds0dvm4ol');

    const res = await fetch('https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload', {
      method: 'POST',
      body: data,
    });

    const uploadedImgUrl = await res.json();
    setUser({ ...user, Profilepicture: uploadedImgUrl.url });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post('/register', user).then((res) => {
      toast.success(res.data.message);
    });
    setUser(initialState);
    generateOtp(user.Email);
  };

  const generateOtp = async (Email) => {
    await axios.post('/generate-otp', { Email }).then((res) => {
      if (res.status === 200) {
        navigate('/verify-otp', { state: { email: user.Email } });
      }
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster toastOptions={{ duration: 3000 }} />
      <form
        onSubmit={singUp}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-10 max-w-sm flex flex-col items-center "
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '120px' }}>


            <h1 className="text-2xl font-bold mb-6 text-center text-white ">
              HeyYou
            </h1>
            <p>Brings Your People Closer.....</p>
          </div>

        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src='/images/heyYou.webp' height={500} style={{ marginLeft: '100px' }}></img>
          <div style={{ display: 'flex', flexDirection: "column", position: 'absolute', left: '50%', width: '300px', marginRight: '300px' }}>
            
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Register here
            </h2>
            <TextField
              label="Name"
              name="Name"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }} 
              value={user.Name}
              onChange={handleChange}
              error={!!err.Name}
              helperText={err.Name}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' }, 
              }}
              InputLabelProps={{
                style: { color: 'black' }, 
              }}
            />

            <TextField
              label="Email"
              type="email"
              name="Email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={user.Email}
              onChange={handleChange}
              error={!!err.Email}
              helperText={err.Email}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <TextField
              label="Password"
              name="Password"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={user.Password}
              onChange={handleChange}
              error={!!err.Password}
              helperText={err.Password}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <TextField
              label="Confirm Password"
              name="ConfirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={user.ConfirmPassword}
              onChange={handleChange}
              error={!!err.ConfirmPassword}
              helperText={err.ConfirmPassword}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <TextField
              label="Phone Number"
              name="PhoneNumber"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={user.PhoneNumber}
              onChange={handleChange}
              error={!!err.PhoneNumber}
              helperText={err.PhoneNumber}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

<div style={{display:'flex', justifyContent:'space-between'}}>
<div className="flex flex-col items-center mb-6">
  {user.Profilepicture && (
    <img
      src={user.Profilepicture}
      alt="Profile"
      className="mb-4 rounded-[4px] object-cover" style={{height:'60px' , width:'60px' ,borderRadius:'50px'}}// Adjust width and height to smaller size
    />
  )}
  <input
    accept="image/*"
    style={{ display: 'none' }}
    id="profile-pic-upload"
    type="file"
    name="Profilepicture"
    onChange={handleImageUpload}
  />
</div>
<label htmlFor="profile-pic-upload">
  <Button variant="contained"  component="span" style={{background:'gray'}}>
    Add Profile Picture
  </Button>
</label>
</div>


            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white', width: '300px', marginTop:'3px' }}
              fullWidth m
            >
              Sign Up
            </Button>
            <p>Already have an account, please <Link to={'/login'} style={{ color: 'cyan' }}>Login</Link></p>

          </div>
        </div>
      </form>

    </div>
  );
}

export default Register; 