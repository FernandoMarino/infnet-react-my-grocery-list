import logo from "../../assets/logo-2.png";
import { HeaderBrandContainer } from "../../styles/layout/header";

export default function HeaderBrand() {
  return (
    <HeaderBrandContainer>
      <img src={logo} alt="Logo My Grocery App"></img>
      <span>My Grocery App</span>
    </HeaderBrandContainer>
  );
}
