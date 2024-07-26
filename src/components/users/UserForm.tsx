import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { validateEmail, validatePassword } from "../../utils/validations";
import { User } from "../../types/auth.types";

const UserForm: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && (!password || validatePassword(password))) {
      const updatedUser = {
        ...user,
        email,
        password: password || user?.password,
      };
      updateUser(updatedUser as User);
      alert("User updated successfully");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UserForm;
