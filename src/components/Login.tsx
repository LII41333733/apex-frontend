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

  React.useEffect(() => {
    // Function to handle the "Enter" key press
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [password]);

  const handleSubmit = async (event?: FormEvent) => {
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
    <>
      <div className="login-container">
        <img className="pt-logo" src="src\assets\spin-gif.gif" alt="pt_logo" />
        <div className="blackout"></div>
        <p>{error?.error}</p>
      </div>
      <form id="login-form" onSubmit={handleSubmit}>
        <Input
          className="w-[50%] mr-2"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {/* <button type="submit" disabled={isLoading}></button> */}
        {/* <div onClick={handleSubmit} className="yang">
          &#9775;
        </div> */}
      </form>
    </>
  );
};

export default Login;
