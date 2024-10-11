import React, { useState, FormEvent } from "react";
import { useLoginMutation } from "@/state/api/apex";
import { useAppDispatch } from "@/state/hooks";
import { setToken } from "@/state/mainSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import spinYang from "../assets/spin-yang.gif";

function fadeOut() {
  const element = document.getElementById("login-container");
  element?.classList.add("hide");

  setTimeout(() => {
    element?.classList.add("hidden");

    const element1 = document.getElementById("loading");
    element1?.classList.add("show");

    setTimeout(() => {
      element1?.classList.add("shown");

      setTimeout(() => {
        // element1?.classList.add("hide");
        element1?.classList.remove("shown");
        element1?.classList.remove("show");
        element1?.classList.remove("fade-in");
        element1?.classList.add("fade-out");

        setTimeout(() => {
          const element1 = document.getElementById("loading");
          element1?.classList.add("hide");

          setTimeout(() => {
            element1?.classList.add("hidden");
          }, 500);
        }, 3000);
      }, 500);
    }, 500);
  }, 500);
}

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
    fadeOut();

    setTimeout(async () => {
      event?.preventDefault();
      try {
        const userCredentials = { username, password };
        const { token } = await login(userCredentials).unwrap();

        dispatch(setToken(token));

        setTimeout(() => {
          const element2 = document.getElementById("main-container");
          element2?.classList.add("show");

          setTimeout(() => {
            element2?.classList.add("shown");
          }, 200);
        }, 500);
      } catch (err) {
        console.error("Login failed:", err);
      }
    }, 5000);
  };
  return (
    <>
      <div id="login-container" className="login-container pt-10 fade-out">
        <img
          className="login-logo"
          src="src\assets\login-logo.gif"
          alt="pt_logo"
        />
        <div className="w-full">
          <div className="flex items-center justify-center pt-2">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h2 className="text-2xl font-bold">The</h2>
                <h1 className="text-3xl font-bold">
                  Official Trading Platform
                </h1>
                <p className="text-balance text-muted-foreground mb-4">
                  Embark on your trading future.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    value={password}
                    required
                  />
                </div>
                <Button onClick={handleSubmit} type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="blackout"></div> */}
        <p>{error?.error}</p>
      </div>
      <div id="loading" className="fade-in">
        <div className="loading-screen">
          <img className="spin-yang" src={spinYang}></img>
        </div>
      </div>
    </>
  );
};

export default Login;
