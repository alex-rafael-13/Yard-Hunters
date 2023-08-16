import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoLogin = e => {
    e.preventDefault()
    dispatch(login('demo@aa.io', 'password'))
    closeModal()
  }

  console.log(errors)
  return (
    <div className="login-modal">
      <h1>Log In</h1>
      {errors?.password && <div className="errors">{errors.password}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          <div>Email:</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label className="login-label">
          <div>Password:</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={demoLogin}>Demo</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
