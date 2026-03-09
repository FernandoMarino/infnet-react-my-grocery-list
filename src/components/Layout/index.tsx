import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStyle } from "../../styles/theme/global";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { BaseContainer, MainContainer } from "../../styles/layout/layout";

function Layout() {
  return (
    <ThemeProvider>
      
      <GlobalStyle />
      <BaseContainer>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
      </BaseContainer>
    </ThemeProvider>
  );
}

export default Layout;
