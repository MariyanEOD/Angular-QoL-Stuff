# svg folder to exportable constant - USABE

1. Put script in root folder.
2. Create directory root_folder/src/assets/svgs/ and add your svgs there.
3. Create icons.ts in root_folder/src/app/shared/icon.ts

THEN run the script using node assets-generator-json.js.

It will generate an exprotable object with key:value being <filename_of_the_svg> : <the_raw_html_of_svg>

example:

```ts
export const iconList = {
   "arrow-left": `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 9.59808C-0.499998 8.44338 -0.500001 5.55662 1.5 4.40192L7.5 0.937822C9.5 -0.216878 12 1.2265 12 3.5359L12 10.4641C12 12.7735 9.5 14.2169 7.5 13.0622L1.5 9.59808Z" fill="#FF5FA8"/>
</svg>
`,
   "arrow-right": `<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 9.59808C12.5 8.44338 12.5 5.55662 10.5 4.40192L4.5 0.937823C2.5 -0.216878 -6.89482e-07 1.2265 -5.88535e-07 3.5359L-2.85693e-07 10.4641C-1.84746e-07 12.7735 2.5 14.2169 4.5 13.0622L10.5 9.59808Z" fill="#FF5FA8"/>
</svg>
`,
}
```
