import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { validateEmail, validatePassword } from "../../utils/validations";
import Input from "../common/Input";
import Button from "../common/Button";
import "../../assets/styles/_login.scss";

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be 6-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const isSuccess = login({ email, password });
      if (isSuccess) {
        navigate("/products");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@dominio.com"
          error={errors.email}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password123!"
          error={errors.password}
        />
        <Button onClick={handleSubmit} text="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
