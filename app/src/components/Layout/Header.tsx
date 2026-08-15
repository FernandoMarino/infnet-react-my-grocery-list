import { Link } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import { HeaderContainer, LinkButton, LinkButtonGroup, ToggleThemeButton } from "../../styles/layout/layout";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import HeaderBrand from "./HeaderBrand";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderBrand />
      <LinkButtonGroup>
        <LinkButton as={Link} to={"/"} >Home</LinkButton>        
        <LinkButton as={Link} to={"/clickcount"} >Click Count</LinkButton>
      </LinkButtonGroup>
      <ToggleThemeButton onClick={toggleTheme}>
        {isDark ? <BsSunFill size={20} /> : <BsMoonStarsFill  size={20}/>}
      </ToggleThemeButton>
    </HeaderContainer>
  );
}
