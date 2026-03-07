import { ThemeProvider } from "../../providers/ThemeProvider";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { BaseContainer, MainContainer } from "../../styles/layout/layout";
import { GlobalStyle } from "../../styles/theme/global";

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
