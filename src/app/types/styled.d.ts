import "styled-components";
import { Theme, theme } from "../../styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
