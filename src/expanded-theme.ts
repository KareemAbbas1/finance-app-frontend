// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";


// here we're grabing the types in createPalette, and the reason we're doing this is because in MUI default types there're "main, light, dark, and contrastText" but in our theme we have 
// colors variations starting from 100 to 900. in the theme file we assing the color "500" to MUI "main" and the color "400" to MUI "light", but we still have the colors "100,200,300,600,700,800,900"
// are'nt included in MUI default types. So what we're basically doing here is that we're extending MUI PalleteColor to include all of our theme colors.
// to check these types, ctrl+click on the imported module and choose the file with the extension .d.ts
declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        //color num  : color
        [key: number]: string;
    }

    // and here we're adding teh tertiary color to the Palette in MUI because it doen't exist by default
    interface Palette {
        tertiary: PaletteColor;
    }
}