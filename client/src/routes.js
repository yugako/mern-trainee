import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import LinksPage from './pages/LinksPage.js';
import CreatePage from './pages/CreatePage.js';
import DetailPage from './pages/DetailPage.js';
import AuthPage from './pages/AuthPage.js';

export const useRoutes = isAuthentificated => {
	if (isAuthentificated) {
		return (
			<Switch>
				<Route path='/links' exact>
					<LinksPage />
				</Route>
				<Route path='/create' exact>
					<CreatePage />
				</Route>
				<Route path='/detail:/id'>
					<DetailPage />
				</Route>
				<Redirect to='/create' />
			</Switch>
		);
	}

	return (
		<Switch>
			<Route path='/' exact>
				<AuthPage />
			</Route>
			<Redirect to='/' />
		</Switch>
	);
}