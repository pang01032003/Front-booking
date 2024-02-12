import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });

  const handleInputChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // Check for password confirmation
      if (input.password !== input.confirmPassword) {
        return alert('กรุณาตรวจสอบรหัสผ่านที่ยืนยัน');
      }
      // Send data to the server
      const response = await axios.post('http://localhost:3000/auth/register', input);
      console.log(response);
      if (response.status === 200) {
        alert('ลงทะเบียนสำเร็จ');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-200">
      <div className="p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl text-center mb-4">แบบฟอร์มลงทะเบียน</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="label-text">ชื่อ</label>
              <input
                id="firstName"
                type="text"
                className="input input-bordered"
                name="firstName"
                value={input.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="label-text">นามสกุล</label>
              <input
                id="lastName"
                type="text"
                className="input input-bordered"
                name="lastName"
                value={input.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="label-text">เบอร์โทรศัพท์</label>
              <input
                id="phoneNumber"
                type="text"
                className="input input-bordered"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="label-text">อีเมล</label>
              <input
                id="email"
                type="text"
                className="input input-bordered"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="label-text">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              className="input input-bordered"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="label-text">ยืนยันรหัสผ่าน</label>
            <input
              id="confirmPassword"
              type="password"
              className="input input-bordered"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">สมัคร</button>
            <button type="reset" className="btn btn-secondary ml-2">รีเซ็ต</button>
          </div>
        </form>
      </div>
    </div>
  );
}
