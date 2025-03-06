import React from 'react';

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';

import './styles/index.css';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
