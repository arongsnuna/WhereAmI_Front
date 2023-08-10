import ReactDOM from 'react-dom';
import App from './App';
import ContextProvider from './context/Context'; // Assuming ContextProvider is exported from Context.tsx

ReactDOM.render(
    <ContextProvider>
    <App />
    </ContextProvider>,
    document.getElementById('root')
);