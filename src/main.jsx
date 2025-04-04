import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Blog from './blog.jsx';
import './index.css';
import { store } from './store';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Blog />
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
