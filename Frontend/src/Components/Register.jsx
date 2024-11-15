import { TextField, Button } from '@mui/material';
import axios from '../axios'
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';


function Register() {

  const initialState = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    ProfilePicture: '',
    PhoneNumber: ''
  };

  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    ProfilePicture: '',
    PhoneNumber: ''

  })
  const [err, setErr] = useState({})

  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/
  const regex_mobile = /^\d{10}$/
  const nameRegex = /^[a-zA-Z]+$/
  function singUp(e) {
    e.preventDefault();

    const errors = {}; // Create an object to hold error messages for each field

    // Check for empty fields
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

    // If errors object has any error message, set it to the state and stop submission
    if (Object.keys(errors).length > 0) {
      setErr(errors); // Set errors for each field
    } else {
      setErr({}); // Clear errors if no validation issues
      handleSubmit(); // Proceed to submit if validation passes
    }
  }


  const handleImageUpload = async (e) => {

    const file = e.target.files[0]


    if (!file) return

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "HeyYou")
    data.append("cloud_name", "ds0dvm4ol")

    const res = await fetch("https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload", {
      method: 'POST',
      body: data
    })

    const uploadedImgUrl = await res.json()


    setUser({ ...user, ProfilePicture: uploadedImgUrl.url })

  }



  const handleChange = (e) => {

    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })


  }


  const handleSubmit = async (req, res) => {

    await axios.post('/register', user).then((res) => {
      console.log(res.data);
      toast.success(res.data.message);

    })

    setUser(initialState);


  }



  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <form onSubmit={singUp}>
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
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

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </div>
      </form>

    </>

  );
}

export default Register;