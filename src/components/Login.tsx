import React, { useState, FormEvent } from "react";
import { useLoginMutation } from "@/state/api/apex";
import { useAppDispatch } from "@/state/hooks";
import { setToken } from "@/state/mainSlice";
import { Input } from "./ui/input";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    try {
      const userCredentials = { username, password };
      const { token } = await login(userCredentials).unwrap();
      dispatch(setToken(token)); // Assuming you have a setToken action in your auth slice
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  console.log(error);
  return (
    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <Input
          className="w-[25%] mr-2"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <div onClick={handleSubmit}>
          <button type="submit" disabled={isLoading}></button>
        </div>
        {/* <div onClick={handleSubmit} className="yang">
          &#9775;
        </div> */}
      </form>
      <p>{error?.error}</p>
    </div>
  );
};

export default Login;
