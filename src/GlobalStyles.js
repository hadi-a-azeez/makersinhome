import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";

const CustomStyles = createGlobalStyle`
    body{
        ${tw`antialiased`}
    }
`;

export default CustomStyles;
