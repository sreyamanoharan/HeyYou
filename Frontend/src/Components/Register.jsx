import { TextField, Button } from '@mui/material';
import axios from '../axios';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const initialState = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    ProfilePicture: '',
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
    setUser({ ...user, ProfilePicture: uploadedImgUrl.url });
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
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <form onSubmit={singUp}>
        <div
          className="max-w-md mx-auto p-8 shadow-lg rounded-lg"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register here</h2>

          <TextField
            label="Name"
            name="Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={user.Name}
            onChange={handleChange}
            error={!!err.Name}
            helperText={err.Name}
            InputProps={{
              style: { backgroundColor: 'grey', color: 'white' },
            }}
          />

          <TextField
            label="Email"
            type="email"
            name="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={user.Email}
            onChange={handleChange}
            error={!!err.Email}
            helperText={err.Email}
            InputProps={{
              style: { backgroundColor: 'grey', color: 'white' },
            }}
          />

          <TextField
            label="Password"
            name="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={user.Password}
            onChange={handleChange}
            error={!!err.Password}
            helperText={err.Password}
            InputProps={{
              style: { backgroundColor: 'grey', color: 'white' },
            }}
          />

          <TextField
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={user.ConfirmPassword}
            onChange={handleChange}
            error={!!err.ConfirmPassword}
            helperText={err.ConfirmPassword}
            InputProps={{
              style: { backgroundColor: 'grey', color: 'white' },
            }}
          />

          <TextField
            label="Phone Number"
            name="PhoneNumber"
            type="number"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={user.PhoneNumber}
            onChange={handleChange}
            error={!!err.PhoneNumber}
            helperText={err.PhoneNumber}
            InputProps={{
              style: { backgroundColor: 'grey', color: 'white' },
            }}
          />

          <div className="flex flex-col items-center mb-6">
            <img src={user.ProfilePicture} alt="Profile" className="mb-4" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic-upload"
              type="file"
              name="ProfilePicture"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-pic-upload">
              <Button variant="contained" color="primary" component="span">
                Add Profile Picture
              </Button>
            </label>
          </div>

          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'red', color: 'white' }}
            fullWidth
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}

export default Register;
