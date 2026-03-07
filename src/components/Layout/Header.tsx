import { useTheme } from "../../hooks/useTheme";
import { HeaderContainer, ThemedButton } from "../../styles/layout/layout";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <ThemedButton onClick={toggleTheme}>
        {isDark ? "Light" : "Dark "}
      </ThemedButton>
    </HeaderContainer>
  );
}
