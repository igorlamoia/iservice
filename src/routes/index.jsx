import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Home, Login, Registration } from '../pages';
import { ErrorBoundary } from './error-boundary';
import { NotFoundPage } from './not-found';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route path="/login">
          <Route index element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} loader={redirectIfUser} />
          <Route path="logout" />
        </Route> */}
      {/* </Route> */}
    </>
  )
);
export default routes;
// loader={({ request }) =>
//   fetch('https://igor-sds2-dsdeliver.herokuapp.com/orders', {
//     data: request,
//   })
// }
