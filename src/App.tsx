import React from 'react';
import store from './state/store';
import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import WebSocketComponent from './components/WebSocketComponent';
import OptionsChain from './components/pages/OptionsChain';
import DisplaySelector from './components/DisplaySelector';
import { useAppSelector } from './state/hooks';
import Positions from './components/pages/Positions';
import { Displays } from './constants';
import Login from './components/Login';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import './index.css';
import './assets/scss/index.scss';
import Portfolio from './components/pages/Portfolio';
import Analytics from './components/pages/Analytics';
import Vision from './components/pages/Vision';
import Trades from './components/pages/Trades';
import ScrollingTickerBar from './components/ScrollingTickerBar';
import spinYang from './assets/spin-yang.gif';
import DemoPositions from './components/pages/DemoPositions';

export enum LoginView {
    LOGIN,
    LOADING,
    MAIN,
}

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Protected />
            </ThemeProvider>
        </Provider>
    );
}

const Protected: React.FC = () => {
    const [loginView, setLoginView] = React.useState<LoginView | null>(null);
    const token = useAppSelector((state) => state.main.token);

    React.useEffect(() => {
        setTimeout(() => {
            setLoginView(token ? LoginView.MAIN : LoginView.LOGIN);
        }, 1000);
    }, []);

    return (
        <>
            <div
                id="loading-container"
                className={`fade-container ${
                    loginView === LoginView.LOADING ? 'show' : 'hide'
                }`}
            >
                <div className="loading-screen">
                    <img className="spin-yang" src={spinYang}></img>
                </div>
            </div>
            <Login
                loginView={loginView === LoginView.LOGIN ? 'show' : 'hide'}
                setLoginView={setLoginView}
            />
            <div
                className={`fade-container h-[100vh] overflow-y-scroll ${
                    loginView === LoginView.MAIN ? 'show' : 'hide'
                } overflow-y-hidden`}
            >
                <DesktopNav />
                <MobileNav />
                <ScrollingTickerBar />
                <div
                    id="main-container"
                    className="main-container pb-0 fade-in sm:w-full max-w-[1650px] m-auto select-none"
                >
                    <div className="md:hidden">
                        <DisplaySelector />
                    </div>
                    <RenderDisplay />
                </div>
                <WebSocketComponent />
                <Toaster />
            </div>
        </>
    );
};

const RenderDisplay: React.FC = React.memo(() => {
    const display = useAppSelector((state) => state.main.display);
    const isDemoMode = useAppSelector((state) => state.main.isDemoMode);

    switch (display) {
        case Displays.PORTFOLIO: {
            return <Portfolio />;
        }
        case Displays.CHAIN: {
            return <OptionsChain />;
        }
        case Displays.POSITIONS: {
            return isDemoMode ? <DemoPositions /> : <Positions />;
        }
        case Displays.TRADES: {
            return <Trades />;
        }
        case Displays.ANALYTICS: {
            return <Analytics />;
        }
        case Displays.Vision: {
            return <Vision />;
        }
        default:
            return <></>;
    }
});

export default App;
