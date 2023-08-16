import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [first_name, setFName] = useState('')
	const [last_name, setLName] = useState('')
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await dispatch(signUp(username, email, first_name, last_name, password, confirmPassword));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
		}
	};

	return (
		<div className="login-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<label className="signup-label">
					<div className="form-text">
						<div>Email:</div>
						{errors.email && <div className="errors">{errors.email}</div>}
					</div>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					<div className="form-text">
						<div>First Name:</div>
						{errors.first_name && <div className="errors">{errors.first_name}</div>}
					</div>
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFName(e.target.value)}
						required
					/>
				</label>
				<label>
					<div className="form-text">
						<div>Last Name:</div>
						{errors.last_name && <div className="errors">{errors.last_name}</div>}
					</div>
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLName(e.target.value)}
						required
					/>
				</label>
				<label>
					<div className="form-text">
						<div>Username:</div>
						{errors.username && <div className="errors">{errors.username}</div>}
					</div>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					<div className="form-text">
						<div>Password:</div>
						{errors.password && <div className="errors">{errors.password}</div>}
					</div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<div className="form-text">
						<div>Confirm Password:</div>
						{errors.confirm_password && <div className="errors" id="small-text">{errors.confirm_password}</div>}
					</div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;