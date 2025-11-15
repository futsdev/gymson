import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoutesRedirect, PublicRoutesRedirect } from './redirect-routes'
import PrivateRoutes from './private-routes'
import PublicRoutes from './public-routes'
import FullScreenLayout from '@/layouts/full-screen-layout'
import PageNotFound from '@/pages/not-found/not-found'

const RenderRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutesRedirect />}>
            {PublicRoutes.map(({ path, element, layout: Layout }) => (
              <Route
                key={path}
                path={path}
                element={<Layout>{element}</Layout>}
              />
            ))}
          </Route>

          <Route element={<PrivateRoutesRedirect />}>
            {PrivateRoutes.map(({ path, element, layout: Layout }) => (
              <Route
                key={path}
                path={path}
                element={<Layout>{element}</Layout>}
              />
            ))}
          </Route>

          <Route path="*" element={<FullScreenLayout><PageNotFound /></FullScreenLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RenderRoutes