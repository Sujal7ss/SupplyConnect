import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

function LoginForm({userType}) {
  const { loginAction } = useAuth();
  const navigate = useNavigate();
  
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(email);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const eye = (e) => {
    e.preventDefault();
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };

  const confirmEye = (e) => {
    e.preventDefault();
    confirmPasswordRef.current.type === "password"
      ? (confirmPasswordRef.current.type = "text")
      : (confirmPasswordRef.current.type = "password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password || !confirmPassword){
      return toast.error("Please fill all fields");
    }
    if(password !== confirmPassword){
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    loginAction(userType, {email, password});


  };
  return (
    <div className="w-11/12 p-2 h-96">
      <form className="flex flex-col ">
        <div className="flex flex-col p-5 justify-center h-full w-11/12">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => {setEmail(e.target.value)}}
            value = {email}
            placeholder="Enter your email"
            className={`h-10 border-2 border-text-secondary rounded-md p-2 ${userType=='driver' ? "bg-secondary" : "bg-primary"}`}
          />
        </div>

        <div className="flex flex-col p-5 justify-center h-full">
          <label htmlFor="email">Password</label>
          <div className="flex flex-row gap-2">
            <input
              ref={passwordRef}
              type="password"
              onChange={(e) => {setPassword(e.target.value);}}
              value={password}
              placeholder="*******"
              className={`h-10 border-2 w-11/12 border-text-secondary rounded-md p-2 ${userType=='driver' ? "bg-secondary" : "bg-primary"}`}
            />
            <button
              onClick={(e) => {
                eye(e);
              }}
            >
              Eye
            </button>
          </div>
        </div>

        <div className="flex flex-col p-5 justify-center h-full mb-5">
          <label htmlFor="email">Confirm Password</label>
          <div className="flex flex-row gap-2">
            <input
              ref={confirmPasswordRef}
              type="password"
              onChange={(e) => {setConfirmPassword(e.target.value);}}
              value={confirmPassword}
              placeholder="*******"
              className={`h-10 w-11/12 border-2 border-text-secondary rounded-md p-2 ${userType=='driver' ? "bg-secondary" : "bg-primary"}`}
            />
            <button
              onClick={(e) => {
                confirmEye(e);
              }}
            >
              Eye
            </button>
          </div>
        </div>

        {loading && <div className="m-auto w-1/2 flex justify-center items-center bg-text-secondary uppercase font-bold h-10 rounded-lg text-primary">Loading...</div>}
        {!loading && <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="m-auto w-1/2 items-center bg-text-secondary uppercase font-bold h-10 rounded-lg text-primary"
        >
          Login
        </button>}
      </form>
    </div>
  );
}

export default LoginForm;
