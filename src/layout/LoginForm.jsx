import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:3000/auth/login', input);
      
      localStorage.setItem('token', response.data.token);
      
      const userResponse = await axios.get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      setUser(userResponse.data);
    } catch(err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-200">
      <div className="p-8 border rounded-lg shadow-lg bg-white">
        <div className="text-3xl text-center mb-5">เข้าสู่ระบบ</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <span className="text-sm font-semibold">อีเมล</span>
            <input
              type="text"
              className="input input-bordered"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold">รหัสผ่าน</span>
            <input
              type="password"
              className="input input-bordered"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-primary mt-1">เข้าสู่ระบบ</button>
          <button type="submit" className="btn btn-primary mt-1">Login with Facebook </button>
          <div className="text-sm text-center mb-5 ">เข้าสู่ระบบ / ลืมรหัส</div>
        </form>
      </div>
    </div>
  );
}