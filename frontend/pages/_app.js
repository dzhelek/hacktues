import '../styles/globals.css'
import { ThemeProvider } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core";
import 'pure-react-carousel/dist/react-carousel.es.css';
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'


const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
			700: "#2a69ac",
    },
  },
};

function MyApp({ Component, pageProps }) {
  return (
   <ThemeProvider theme={customTheme}>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
   </ThemeProvider>) 
}

export default MyApp
