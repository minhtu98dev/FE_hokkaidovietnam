import ReactDOM from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

// Setup redux store
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from './Redux/configStore';

import router from './routers/router';

// * Provider authentication Handler
import { AuthProvider } from './Auth/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // disable focus window fetching
        },
    },
})

root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer autoClose={1000} />

                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </Provider>
);