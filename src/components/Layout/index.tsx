import { ThemeProvider } from "../../providers/ThemeProvider";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStyle } from "../../styles/global";
import { MainContainer } from "../../styles/layout/layout";

function Layout() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
