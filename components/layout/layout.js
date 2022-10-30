import { CircularProgress } from '@mui/material'
import Head from 'next/head'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children, title = "Quiz App", name = "", loading = false }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="quiz app by create md naim" />
            </Head>
            <header>
                <Navbar name={name} />
            </header>
            <div className='hero'>
                {
                    loading ? <CircularProgress /> : children
                }
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout