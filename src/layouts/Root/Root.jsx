import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet, useNavigation } from 'react-router'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'
import useAuth from '../../hooks/useAuth'
import ScrollToTop from '../../utils/ScrollToTop'

const Root = () => {
  const { loading } = useAuth()
  ScrollToTop()
  return (
    <>
      <div className="flex flex-col min-h-screen font-inter text-gray-900 bg-gray-100">
        <Navbar />
        <main className="flex-1">
          <Outlet />
          {loading && <Loader />}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Root