import React, { useState, FormEvent } from 'react';
import { useLoginMutation } from '@/state/api/apex';
import { useAppDispatch } from '@/state/hooks';
import { setToken } from '@/state/mainSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginView } from '@/App';

const Login: React.FC<{
    loginView: string;
    setLoginView: (loginView: LoginView | null) => void;
}> = ({ loginView, setLoginView }) => {
    const [username, setUsername] = useState<string>('admin');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();

    const [login, { error }] = useLoginMutation();

    React.useEffect(() => {
        // Function to handle the "Enter" key press
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [password]);

    const handleSubmit = async (event?: FormEvent) => {
        event?.preventDefault();
        setLoginView(null);

        try {
            const userCredentials = { username, password };
            const { token } = await login(userCredentials).unwrap();

            setTimeout(() => {
                setLoginView(LoginView.LOADING);

                setTimeout(() => {
                    setLoginView(LoginView.MAIN);
                    dispatch(setToken(token));
                }, 5000);
            }, 1000);
        } catch (err) {
            setLoginView(LoginView.LOGIN);
        }
    };
    return (
        <>
            <div
                id="login-container"
                className={`fade-container ${loginView} login-container pt-10`}
            >
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
                                <p className="text-balance text-muted-foreground mb-4 mt-2 text-xl">
                                    turn your{' '}
                                    <strong className="text-white tracking-wide">
                                        vision
                                    </strong>{' '}
                                    into reality.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                    </div>
                                    <Input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="password"
                                        type="password"
                                        value={password}
                                        required
                                    />
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full text-black"
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="blackout"></div> */}
                {error && 'status' in error && (
                    <p className="text-center py-1">
                        {error.status === 'FETCH_ERROR'
                            ? 'Unable to connect to server'
                            : error.status === 401
                            ? 'Incorrect Password. Please Try Again.'
                            : ''}
                    </p>
                )}
            </div>
        </>
    );
};

export default Login;
