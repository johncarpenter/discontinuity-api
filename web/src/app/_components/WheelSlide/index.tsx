import style from './wheel.module.css'
import { classNames } from '@/lib/utils/classnames'

export default function WheelSlide() {
  return (
    <figure id="projectsvg">
      <svg viewBox="0 0 1366.87 951.32" style={style}>
        <filter id="drop-shadow-11" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="7" />
          <feGaussianBlur result="blur" stdDeviation="5" />
          <feFlood flood-color="#000" flood-opacity=".25" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter id="drop-shadow-12" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="7" />
          <feGaussianBlur result="blur-2" stdDeviation="5" />
          <feFlood flood-color="#000" flood-opacity=".25" />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter id="drop-shadow-13" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="7" />
          <feGaussianBlur result="blur-3" stdDeviation="5" />
          <feFlood flood-color="#000" flood-opacity=".25" />
          <feComposite in2="blur-3" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter id="drop-shadow-14" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="7" />
          <feGaussianBlur result="blur-4" stdDeviation="5" />
          <feFlood flood-color="#000" flood-opacity=".25" />
          <feComposite in2="blur-4" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <clipPath id="clippath">
          <rect className={style['cls-1']} x="233.01" y="613.86" width="52.29" height="51.43" />
        </clipPath>
        <clipPath id="clippath-1">
          <rect className={style['cls-1']} x="262.36" y="513.75" width="51.43" height="51.43" />
        </clipPath>
        <clipPath id="clippath-2">
          <rect className={style['cls-1']} x="316.3" y="415.86" width="43.72" height="43.72" />
        </clipPath>
        <clipPath id="clippath-3">
          <rect className={style['cls-1']} x="407.98" y="324.81" width="51.43" height="48.01" />
        </clipPath>
        <clipPath id="clippath-4">
          <rect className={style['cls-1']} x="497.43" y="277.34" width="52.29" height="45.43" />
        </clipPath>
        <clipPath id="clippath-5">
          <rect className={style['cls-1']} x="608.63" y="235.88" width="42.86" height="52.29" />
        </clipPath>
        <clipPath id="clippath-6">
          <rect className={style['cls-1']} x="834.92" y="272.11" width="52.29" height="48.86" />
        </clipPath>
        <clipPath id="clippath-7">
          <rect className={style['cls-1']} x="727.45" y="239.83" width="52.29" height="51.43" />
        </clipPath>
        <clipPath id="clippath-8">
          <rect className={style['cls-1']} x="937.64" y="321.5" width="51.43" height="51.43" />
        </clipPath>
        <clipPath id="clippath-9">
          <rect className={style['cls-1']} x="1074.34" y="512.77" width="47.15" height="52.29" />
        </clipPath>
        <clipPath id="clippath-10">
          <rect className={style['cls-1']} x="1023.04" y="415.4" width="55.72" height="49.72" />
        </clipPath>
        <clipPath id="clippath-11">
          <rect className={style['cls-1']} x="1099.21" y="622.45" width="52.29" height="35.15" />
        </clipPath>
        <filter id="drop-shadow-15" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="7" />
          <feGaussianBlur result="blur-5" stdDeviation="5" />
          <feFlood flood-color="#000" flood-opacity=".25" />
          <feComposite in2="blur-5" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>

        <g className="hover:opacity-90">
          <a href="dashboards/retail">
            <path
              className={classNames(style['cls-23'], ' hover:fill-blue-300')}
              d="m1134.33,702.92c0-121.59-49.19-231.68-128.75-311.48l-311.48,311.48h440.23Z"
            />
            <text className={classNames(style['cls-9'])} transform="translate(922.28 576.88)">
              <tspan x="0" y="0">
                Retail
              </tspan>
              <tspan x="0" y="28.8">
                Analytics
              </tspan>
            </text>
          </a>
        </g>

        <g className="hover:opacity-90">
          <a href="dashboards/ecommerce">
            <path
              className={classNames(style['cls-23'], ' hover:fill-blue-300')}
              d="m694.1,261.78c-.31,0-.61,0-.92,0-121.59,0-231.68,49.19-311.48,128.75l312.39,312.39v-441.14Z"
            />
            <text className={classNames(style['cls-9'])} transform="translate(515.05 433.65)">
              <tspan x="0" y="0">
                Ecommerce
              </tspan>
              <tspan x="-.35" y="28.8">
                Enablement
              </tspan>
            </text>
          </a>
        </g>

        <g className="hover:opacity-90">
          <a href="dashboards/experience">
            <path
              className={classNames(style['cls-6'], 'hover:fill-blue-300 hover:opacity-70')}
              d="m252.03,702.92h442.06l-312.39-312.39c-80.1,79.87-129.67,190.34-129.67,312.39Z"
            />
            <text className={classNames(style['cls-9'])} transform="translate(345 587.65)">
              <tspan x="0" y="0">
                Marketing &
              </tspan>
              <tspan x="0" y="28.8">
                Acquisition
              </tspan>
            </text>
          </a>
        </g>

        <g className="fill-white">
          <a href="dashboards/logistics">
            <path
              className={classNames(style['cls-7'], ' hover:fill-blue-300')}
              d="m1005.57,391.44c-79.67-79.9-189.79-129.42-311.48-129.66v441.14s311.48-311.48,311.48-311.48Z"
            />
            <text className={classNames(style['cls-9'])} transform="translate(728.88 433.65)">
              <tspan x="0" y="0">
                Logistics &
              </tspan>
              <tspan x="0" y="28.8">
                Fulfilment
              </tspan>
            </text>
          </a>
        </g>

        <g className="hover:opacity-90">
          <a href="dashboards/summary">
            <circle
              className={classNames(style['cls-22'], 'hover:fill-blue-300')}
              cx="693.18"
              cy="702.92"
              r="174.03"
            />
            <path
              className={classNames(style['cls-3'])}
              d="m782.89,652.03v-.3s-.04-.3-.04-.3l-.04-.31-.05-.32-.06-.32-.07-.31-.08-.31-.09-.31-.1-.31-.11-.31-.12-.31-.13-.3-.14-.3-.15-.3-.16-.3-.17-.31-.17-.29-.2-.31-.2-.3-.21-.3-.22-.29-.23-.28-.23-.27-.24-.26-.25-.25-.24-.23-.25-.22-.24-.2-.24-.19-.23-.17-.24-.16-.24-.14-74.17-43-.04-.02-.25-.14-.26-.13-.28-.13-.29-.12-.3-.11-.31-.1-.31-.09-.34-.08-.33-.07-.33-.06-.33-.05-.33-.04-.34-.03-.34-.03-.34-.02h-.34s-.34,0-.34,0h-.35s-.35.03-.35.03l-.34.03-.37.04-.37.05-.36.06-.36.08-.33.08-.33.09-.32.1-.31.11-.31.12-.29.13-.26.13-.25.14-74.33,42.74-.04.02-.25.15-.24.16-.25.18-.25.19-.25.21-.24.22-.24.23-.24.25-.24.26-.22.25-.21.26-.2.27-.2.28-.19.28-.18.29-.18.29-.17.3v.02s-.18.31-.18.31l-.16.31-.15.32-.13.31-.14.34-.12.34-.11.34-.1.33-.08.33-.07.33-.06.33-.05.33-.03.31-.02.29v.29s-.16,85.74-.16,85.74v.33s.03.3.03.3l.03.31.04.31.06.33.07.32.08.31.09.31.1.31.11.31.12.31.13.31.14.31.14.3.15.3.16.3.17.29h0l3.54,3.7h0s74.17,43,74.17,43l.19.11.26.14.29.13.29.12.29.11.29.1.3.09.31.08.31.07.31.07.32.06.34.05.34.04.35.03.35.02h.35s.35.02.35.02h.31s.37-.02.37-.02l.37-.03.37-.04.36-.05.36-.06.35-.07.35-.08.31-.08.31-.09.3-.1.28-.1.27-.11.26-.12.26-.13.25-.14,74.33-42.74.19-.11.25-.16.26-.18.25-.19.24-.19.23-.2.23-.21.22-.22.22-.23.21-.24.21-.25.21-.27.21-.28.2-.28.19-.29.19-.3.18-.3v-.02s.16-.27.16-.27l.17-.33.16-.33.15-.34.14-.34.13-.34.11-.33.1-.34.09-.31.07-.31.06-.31.05-.29.04-.29.03-.29.02-.29v-.28s.16-85.74.16-85.74v-.18Zm-50.56,108.26c-2.82,0-5.38-1.09-7.3-2.86l-25.19,14.31c-.94.54-2.1.54-3.04,0l-65.49-37.13c-.97-.55-1.56-1.57-1.56-2.68v-74.06c0-1.11.59-2.13,1.55-2.68l27.26-15.58c-.87-4.58,1.33-9.38,5.7-11.59,5.29-2.68,11.76-.56,14.44,4.73,2.68,5.29.56,11.76-4.73,14.44-4.3,2.18-9.37,1.19-12.56-2.1l-25.49,14.57v70.48l62.41,35.38,23.58-13.4c-.2-.82-.31-1.68-.31-2.56,0-5.93,4.81-10.74,10.74-10.74s10.74,4.81,10.74,10.74-4.81,10.74-10.74,10.74Zm34.43-28.3c0,1.1-.58,2.11-1.53,2.66-.95.55-2.12.56-3.07.02l-63.9-36.19-23.62,13.37c1.43,5.45-1.63,11.15-7.05,12.93-5.63,1.84-11.7-1.24-13.55-6.87-1.84-5.63,1.24-11.7,6.87-13.55,3.78-1.24,7.75-.26,10.52,2.22,8.44-4.78,16.87-9.55,25.31-14.33.96-.54,2.08-.5,3.04,0l60.82,34.45v-67.04l-58.96-33.54v27.63c4.24,1.44,7.3,5.45,7.3,10.18,0,5.93-4.81,10.74-10.74,10.74s-10.74-4.81-10.74-10.74c0-4.99,3.4-9.18,8.01-10.39v-32.72c0-1.1.58-2.11,1.53-2.66.95-.55,2.12-.56,3.07-.01l65.13,37.05c.96.55,1.56,1.57,1.56,2.68v74.12Z"
            />
            <text className={classNames(style['cls-9'])} transform="translate(642.54 697.68)">
              <tspan x="0" y="0">
                Overview
              </tspan>
            </text>
          </a>
        </g>

        <g id="g18bc7ff2a6e_1_225.16">
          <path
            className={style['cls-21']}
            d="m216.75,640.33h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
          <path
            className={style['cls-2']}
            d="m216.75,640.33h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
        </g>
        <g className={style['cls-4']}>
          <image
            className={style['cls-25']}
            width="61"
            height="60"
            transform="translate(233.01 613.86) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA9CAYAAAD1VdrqAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAFeklEQVRoge2bMY/cRBTHf9mcIhE51UmIPQmJAjk0qZaKArmCZu8D5CqqO/qjQkLaiiqHKGhyBR3JB9ht6LaiQHcVVawUSJGyaa6BFUiRkCieJ36eHdszHvt2c/CXrB377Jn5z7z35r03c7eIRwJk6uqKS2AJzIF1ZJ9acSvi2zFwgpBNWt5dA8+A+x7vAiyAx8Aqon+N6ELcEJ46/rYGLpDZy4vfOkyKuj6mfvAGG4BQ4g8R0nYnF4iYLiP6MgEO2RzQNUL+aUTdG/AlngAzNnX4KfCEfmckAY6KSw/wJXBKT/rvQzwFzhCx1J2YMaAOFu2dUh3sNXCMqNGgSBHxvSiuJSLu14mpow/pkA26SA/aYEtf5n32pU7Ux4j+Gh3LEREbfH1tQAKcUxKOEvvbNQ38QKnTu0Aa4DXwM/AJsA/cAR4Uz16HVjZyPDuhOqoztk/awMyy6U+K9C8aE0o9uijudxEp1X5moRXYon4O3FPlheObadFwH0vKGHFjD5FB/gx4TruEXRW/ZmIeIMYvWORBCJkRnON2ITP1TqyFt1cNc/0KvOdZxxP13XFI41rHT1T5DPeoa7L3HH/vAyPgQ893z1TZ9vRaGwGZbWPFTXg4NMxq4VKZvz3ruKQMhBJEZbxgiOsPeg0GWpASrzLnqnzk+9EImWljJFZcz2yDSNlM3Xc1lpeUMcMYz4EcUV0Klh0bt5EAXyLEHrK5LNqkF5T+Qo4kLUKwVOXM54M9q1PLmvdCkALfA+8W9zq+zoE/kOSDgSENovMvCXeY5pTBk5fvsWd1oilj4oNjmpcVWwxz4JF13wU5MlgJAcTNEhBD2riOmtgr4Cdk2UsRR0XH9Ff0GwM8oyTd6mDtqXLX0XaloxbITLpITRBxrktiJMBXDd/X4ZKSeKuPoYn/GdAISIT0mKpomaBm2fBdm2SZ0DMlYHmi2v9JWzua+MuARgC+Ad5R933lxFLr1xdBEquJh+bPDOlBsqBDwxWPhyBHdLyJdIo7B79V6Bn3CTr0O3r9rcMY0dkEkYyl9fdWXRwKesZ9dEobkLnH+weU1t6uf4aoSF/SMG5/pUSsqMfAEPaOqFpwoMqthk4T39U0ky+0RLUuzSPK5SeWeB8hZgzuq3Kr3RhRjYS6djxFjNg5gbrWE8ZU0+GtGFG1tF31LUOMWEJV164LmSp7rRI28cz92s5DT9jS54MR4rEZ8dDZmLcF2rasCJhxqK7JQWnaHYAOZHx8C6DcNEwQT8w4Gye4R64t0TAEmjzEMVWyh3jGHGbG10hy3qCOXGjo2gem1Ht3M1VeEBBo6W1ie9bPcAcfp7iXvfeBvyi3dwz2gbvAC+v5XWTGfgf+Uc9vF3W9KJ7nVDcODDLKtNUaCZY6n9DQ20hLtuuQNGFMdfspWP3sTcMcseoHRO4/DwjX/v3XoZW4TkTYIr8rBwMMHlH6G51F3BWdmc13A+OOem/IDYjvqDpZp3TU67qwNKdqMbdNPkFWnU/Vs1eE77i8gesMjEGOJCCz4n4f+Lx4PuT5Nhtm0D+wnifIeZhONqiJOAjJvGjgDpJ6Oix+f+vSYAAS4AvgW8qU1xr4Efio6M8+Hcn7Hul0nW5cI4bGdVwkFlPEe9TtrRCdztlUvWADHHKINyk6Y59sXCH6F3vO3GzsH7EZ0y/ZPH0VRb7Lse0J9d7bpXX51JUidsQVFa4QwnV1dSYfc1B/isxOk3dnDujbaDuwv0IysD5q1Il8DHEDc848I265M3n3OeG59mDyfRC3O5AVvwc0S4NZLs1/MsRuLLjI1zo4fRPfNmzytQd9bxpx8CR/E4mDB/mbShzc5N9EctvcOxsatmWv5PzbfPW3HVfAL0iAYw4v2qmx//GfwL++51ElbZ0/vQAAAABJRU5ErkJggg=="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.13">
          <path
            className={style['cls-21']}
            d="m246.05,548.93h0c-5.06-22.79,9.37-45.57,32.41-50.64h0c10.89-2.53,22.53-.25,31.9,5.82,9.37,6.08,16.2,15.7,18.48,26.58h0c5.06,22.79-9.37,45.57-32.41,50.64h0c-22.79,4.81-45.32-9.62-50.38-32.41Z"
          />
          <path
            className={style['cls-2']}
            d="m246.05,548.93h0c-5.06-22.79,9.37-45.57,32.41-50.64h0c10.89-2.53,22.53-.25,31.9,5.82,9.37,6.08,16.2,15.7,18.48,26.58h0c5.06,22.79-9.37,45.57-32.41,50.64h0c-22.79,4.81-45.32-9.62-50.38-32.41Z"
          />
        </g>
        <g className={style['cls-10']}>
          <image
            className={style['cls-25']}
            width="60"
            height="60"
            transform="translate(262.36 513.75) scale(.86)"
            href="data:image/png;base64,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"
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.14">
          <path
            className={style['cls-21']}
            d="m297.09,427.59h0c6.58-22.53,30.13-35.45,52.41-28.86h0c10.89,3.04,20,10.38,25.32,20.25,5.32,9.87,6.84,21.52,3.54,32.15h0c-6.58,22.53-30.13,35.45-52.41,28.86h0c-22.53-6.33-35.45-29.88-28.86-52.41Z"
          />
          <path
            className={style['cls-2']}
            d="m297.09,427.59h0c6.58-22.53,30.13-35.45,52.41-28.86h0c10.89,3.04,20,10.38,25.32,20.25,5.32,9.87,6.84,21.52,3.54,32.15h0c-6.58,22.53-30.13,35.45-52.41,28.86h0c-22.53-6.33-35.45-29.88-28.86-52.41Z"
          />
        </g>
        <g className={style['cls-13']}>
          <image
            className={style['cls-25']}
            width="51"
            height="51"
            transform="translate(316.3 415.86) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAEG0lEQVRoge2avW4bRxDHf1YqIwhMuHQR3COwTcfCD6BH2EdQ5fpKl6xSu1KdRkXcRIBdqDRgQICAACEMwWBMkRAkkUoVpZgZ7PJ0d7t3xzvRQP7AgpRuP+a3H7Oze4R+5IA1MAeOE8uMgb+ATz3Z1FoO2AAPmpakQb3T/DMg68WyFnJ4mCVwTzrUXPOue7SvkRzbMMcV/yvTGFhovpOe7UySo9rwumemI2SELjX/k8oRNziW50SfzaleP2PgVvPknSyukcMbekP9dAnzLpFRCZ8tgPOKsgazQdZl3triRAMtXWnjdUat1ahp4fnRoxLb5TaaLoBRB7tL5dju7Uv9rIJqa1TWslwjOcrXwzHlUF16eIJ01uAwpiKUo1sPj5EpetawXJIcaXtKCPUPPU+XtnKkwZhO8Bvldw8ziFdCHIZDYsC3qW049gsmQ9z9V3xk8aBt5rHCjv2CAfgDH/BaZHEJ3MXaOmT/YECAZtrGCbIZV23kW8ZdsX8wpknTAueI71+wfzCNlSMga+LG7T3MCD/V7qmfm0PDhEeH1DsKcuBaUzESLqt8aJgmTgqQaWY7e5WBIwTgKWAa3VEcAl+04LuafFNkjT0FzGfETSeN1FQzfkHgypQFlV3R71VTGYx1niMB6gI/3aqUI+trQY9neuphTI4I1EofntU0FEL3NdVCmBtkxlS15diGysNKZvqgzrtZ4TroLip6M+s8V5F/hADfaN73AAf64AD4G5lSVYW/6fc+gMbAB+AHxJPdIrPmOfArj6FGmv9H4CdkhN6AgAD8i5wuq5QF36ug26oI8xX4GfidciiDeQW8RGBeE1zyT5AQfEb9Yp8hQ/vbLihUMQcQHuc3iNv+TP0NExN8SJ7XNG4b77wLQaAUbwbbUPdEYNBKZsR7365rF1UVNVAqjCmEil1oAr73/6zJ4/DRRJc3BE1hRiRMs6LONPOK+gjA3uEsafeWYBAYkMW20FR1xwwSFoXXUy6lctVgMCCjYtFC1RsAUzifrxFHEoscjtSgNQPAmGzazYmf24/xI2Un3CkygpMgTbW+cKoOAoMaYA3HRgl8KG9nlA1+P5shDmQVPLOD4yAwpjP8BUmekD9Dzk9XCMCM7Tuz0CtOInXtBOZZ4e8xcAq8QEKhX0j/3cCEx0afavlYuBQNZ7oox6+Pb3TfRGPa+TQr00dtYIO42r6gBoGxhs7xI2Uvr3apMXJovKZnGFOx95bI4s52UG+OeMc1/c+CRwr3nHv8zVDWsB4DucNvD/Yqv2ldnXWohhjYSr9f4DfUYg9niNfLke1gxXbY1NvvDVJlPWw/GwvP/eGGGqZwc7VQaYWMejaQ3VGNEAfxHn+XFwKGaYWHukCii6xP44obaxtN8BvqGB/anOrnJ/2+67uI//Vd6j8z/Vdrb06TKAAAAABJRU5ErkJggg=="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.11">
          <path
            className={style['cls-21']}
            d="m395.08,337.17h0c6.33-22.53,29.88-35.7,52.41-29.12h0c10.89,3.04,20,10.38,25.32,20.25,5.32,9.87,6.84,21.52,3.8,32.15h0c-6.33,22.53-29.88,35.7-52.41,29.12h0c-22.53-6.58-35.45-29.88-29.12-52.41Z"
          />
          <path
            className={style['cls-2']}
            d="m395.08,337.17h0c6.33-22.53,29.88-35.7,52.41-29.12h0c10.89,3.04,20,10.38,25.32,20.25,5.32,9.87,6.84,21.52,3.8,32.15h0c-6.33,22.53-29.88,35.7-52.41,29.12h0c-22.53-6.58-35.45-29.88-29.12-52.41Z"
          />
        </g>
        <g className={style['cls-12']}>
          <image
            className={style['cls-25']}
            width="60"
            height="56"
            transform="translate(407.98 324.81) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA5CAYAAACF8yP/AAAACXBIWXMAAAzrAAAM6wHl1kTSAAABLElEQVRoge2ay23DMBAFx4ELcAkqIR04HbgFpwOXoHTgDuJUkpTiEtSBfZCdSyB+IJGR9N4APK2w2IEAEtwlLIMWuGWsINtSVRbiC7gE4t8pSZYmfQV+xiZ5GV3GArG0CpZWwdIqWFoFS6sgKV36wnF8rBjd47uuYC2/lJb+zPj2RH9vLk6tq+VHIPYG7CvVAdSTbiOxqtKSG5mlVbC0CpLSQ0fWjr6/vEvIcSHci54dQ9In4JCYY89KpJ9MMlGYGzHpKxNMFOaG5EZmaRUsrYKlVbC0CpZWwdIqWFoFSelYE6GhnzWNJZSjycjTRHKNomWaV7c5OdoK9QDDf/oMvJLeDR3infT59DkQn6oeY8wK2VDpncc/82ejzDkKlryOT+Et4Ucwa6HDR5kgd/OphHKQqnzUAAAAAElFTkSuQmCC"
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.5">
          <path
            className={style['cls-21']}
            d="m482.02,296.01h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
          <path
            className={style['cls-2']}
            d="m482.02,296.01h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
        </g>
        <g className={style['cls-11']}>
          <image
            className={style['cls-25']}
            width="61"
            height="53"
            transform="translate(497.43 277.34) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA2CAYAAACfkiopAAAACXBIWXMAAAzrAAAM6wHl1kTSAAADW0lEQVRogd2a25GbMBSGP2fyHlJB1EHcQShhS6CDuAQ6iLcDSnA6UDrwdsB24K3AeRAaCS0YXY3xP8OwXsG5SEfnJnbAHmiBCoMz0A33p4UErjPXkfGEPA12gAAa1ARg/f41/P4H1PcUam00mJVvV5WkAHYL4wfgD/CBsoTLxDMvKD+xBfQo3+X98BVlAS5q5v3Do141wFcPxU/Ab9TKds6YBF55/BWvgJ+hL+0xs7VVD9+g5J/aqjfRM2/uW4DEhOcgHIcXT5kFugcExmKDt+SWzf2AkruPJdCzTXM/k5iLlDT3BuV4ckcHgbFUEUtEm3uwZ/SApEyGqBfrU7H1JYDIGXgHvqFi+hag5ezcgRDFwZj5FhTfAz+Gvzt3MFRxTWALih+G+18mtmeo4lsydy3fpDMOVRxM3f7Iir+gFueDjIrn2OfHgc5cMrRHTXBwijnAXu2sUeiCChOxyktMmKkYh7O9RV9G0K4yyDeLbiDcRb5vK3fGZFcn6/+xCU1DuXyDlwzEbeXdKyWLOxFZifkihzlNKZ+idGXRKdYc6Ugzdw3X7FOqv4bESswH2txzMBF8PtSIQXIl5gu9Uo/QcxMEVGIxcdyGjulNIp0c0L7mjcKmrpkV31Oe0GZ+WHoQlg8UfHBBpYevFIqdHqhQLXCA7/eSQ7L+IYG+vLtDPgcKSzihDhjfSQ9tqSiWtExBsN0ObDK0Y2lWlsMbqeFMQw73R67Ri2BzBw45wplGj2ruvbFOWOtYybm2rBvKgjx6zhUHZfJrmboMeTi34qAUrzGFiySuhbQEMfARqK0lWenztApzZONePfk8vmA+W5TcuVKsMLFcK9oNgtgdliaRj9uxOVt87A5OncjHG53F1F3Zyhq/JgrVYxR2V1ZgJv/CHXyNwCh1y5x1E1BG8mkwSomZZyrM5LSRfLyhvzhYciyCtCTHt3va+MiTI2XVSiyVhD3qSAfiHJAvHzncb37elStXfyR4WVMOxXV6uhSu9qhODcTF2xA+oFLnohD4hStJYJfEQWPxmdsq9rlZG8knCHbi4jb7BMYxpbai7XBVO2O1Nd5zx9RZMk4iJOOkJkcCM5UouXxSjqCi0TJ9ECjJl025CZHbbBQ+REoUKTBWsqdM371ivLKl+DwX/gMlGp/4BYZ2hQAAAABJRU5ErkJggg=="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.7">
          <path
            className={style['cls-21']}
            d="m582.46,261.9h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29,0-42.28-18.99-42.28-42.28Z"
          />
          <path
            className={style['cls-2']}
            d="m582.46,261.9h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29,0-42.28-18.99-42.28-42.28Z"
          />
        </g>
        <g className={style['cls-17']}>
          <image
            className={style['cls-25']}
            width="50"
            height="61"
            transform="translate(608.63 235.88) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA+CAYAAACGPyP0AAAACXBIWXMAAAzrAAAM6wHl1kTSAAACiklEQVRoge2a0XHbMAyGv/Tybm0QbWB3gsgT1BvUnaDaoO4GGSEjZIOwG8gbOBsoE6QPEGPGlW2JgE02p+9OZ/FOhviLJAiQBFgBbxldjyhwnZEWWGsMKSiApqvHLtbIbXC/QoQNYdH9NkG5OPF8g3ysY7RADTwDdwPr0ItDvkg14j87Pn5Bb+PYNcR2FTwfxe35R3pZHZSb3qf2nGoVM2LFHFa+1lbEgi+pK2BJ2DLPyWphxKdqmVDMErhJeC0txfz3TGJyJXaeuQQNsOX8BHyUnMS0SEgTHS3k1s1UYY+2ZSrGBajWNEiQ24JOzBPwzaBCWrZ03VMTNXshW64UFfdwD8yRQHcTK8YnZ9vgPgUPwE9f0DqAVC3S+36tAyiBjdKGhiosaMXcAb+UNszQinlBuTSkpEKcAKAXsyNtN9tgKKYg7aRZhgWtmDkZpdtaMa8oolwDSoJFQ62YhrTdbEPgTXOLmlVY5TML/l3lPEaDBKnmWIlxwGzE81+5wFizElMzfDuk4UJOw0pMRTB59fCDK0QKkwPoYU26Xbd3tC1zarfsGvj3lxDfMg6ZrOac3+K7JH6cvjsUx/htQJABnXpn+q0TUoBuzKyRHDx1V3P+xiI2s2SB5EhR3TYn11wiX9nFGshNzAxxKlHkJEbNJCZXPpWY6RxArlieA1gCv5EsMsk5AIiPzUL8wTfNab4q+H8UFt2sZj/RvXa/30mwb2Mhxgeaf5BZ3AuqDGyPwtIB3CNLSH6VZmdoezAO3ZgpkCj3MMcYS4VyzITzTGxe0iLdqw7Kj7EV0vLE/ihwys1WR3yrAtIyD8g2+KwzmGpV3+fzTmtoTfpc/kM+H8NNcF+QtpuBQatM5MhfTy7isOtD7q4AAAAASUVORK5CYII="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.10">
          <path
            className={style['cls-21']}
            d="m816.36,297.3h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
          <path
            className={style['cls-2']}
            d="m816.36,297.3h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29.25-42.28-18.74-42.28-42.28Z"
          />
        </g>
        <g className={style['cls-16']}>
          <image
            className={style['cls-25']}
            width="61"
            height="57"
            transform="translate(834.92 272.11) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA6CAYAAAADZ1FRAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAEBElEQVRoge2b0ZGbMBCGv8nkPZSgDuIOog7iEpQOXAIluIOQDlwCJVwqiK4Dp4LkQWwQICEhwObm8s94uIC02l+72l2EAo+BetA4T4cCasACf7qrAaon6bMrzsANRzT0u+Mm482TVwytKr8XnHXl+X30vOENun7IqnccmVOkj2E6OTdA76noWijmrZrrtmegHcloOxmHwdxavVG+RjXOM3x5lieSr4ALU6ta4MpwjUqAUoVjKRz5kMyHBD3NdPYl8GivXUV4jTaUk6+YBj2JE6UyZweLWfVCerZNoG9DPKDl6BOTqQtl/oMmz6q5iAWoElkCs7XMEqvmQBNW9LxS5jiYWgqCXigS6xWKjXFi++isIjKzl5J0aANCtrL6nKKmYAxFuFaocwWI2/mK7Rk5FeHoXDNPXgJby9Q7LStI+wOEInnLujU5HqMmnes1U0P4nqi6PqtJ+whFY8t2RUMsNd0C92J1fc3GpAWK8IyHlChBRdh1ZQLMTN+anUj7ysVcf06xGDRp902hZmfSPuZcX830U4Sjb+q1NIaaB5IWhHLxuKqbi74p902h5gmkBRKRLUNSL6xz3xRqnkjah2Fq1VL3TaFmAekPGw/uo8G59rfu3z/pXfxlx3GT2JO0wHbX+wPGysIjSB8O/0m/F/wn/V7w8dkKLECFS4HjHH9nYYHzFkhrXOX2NbOtok+TQRyZtMIVOF+8e6+4Ks969zTO+p+6tr+AH7iJitYGe5WhvlJLxzgzrNUb0qWrwVV6WRuFRyNtGL6oLK3TxcJS6wf7H4n0iV7hhvLtKF+ODck5Emm7oG0KPvHb+OFRSNf0LrnVXvuFfqlo/8FRSItVzMbjt4ysfZSK7IxLOa+4tVwqo2ZaqIi8r3gedARLN12ba+EYhogbdxAvOsNxLK26a1vQ1wDfu79/Et6VkXsnOA5pqbqWbiMZhoQ14Sqs7a6HIi2wgXuavlDxo7ohj7CPCo5HOgQL/AY+4ywmm4tLCQ/gb7hv9UXShyYdyCzxIATTCssvU3NyesMoUPpFur8Jv1WBoEmTliMVl5k2PvElhKHnOJCv2fawzVh2ivQlow044pbezXOg6PkEXz5in2Us5dbXpAn5iqmCMebQ0HNI4szyw64haPKsKMpNXg5WQNHrbpZ2rJl+gHsh75CMJo90sYIzkLVs1wgxhD/KXYm7pSZNOiR3bSZpSKzlpVBMD8QKMTNqqwmTVsTjxxqLVwyXZYmM5ACGadrzTwlphqQ100zhe0s1kncjP7gZhoYwixkthJxGCK19saAl7RmC66jtDZdBtNdG9sKvI9l39im0oqgIH8QpyQCa+ImjmOyaJ/+nGI0j2Ha/0lx/wpFpmRK19GdWnkr20PgLlHJmwazHtswAAAAASUVORK5CYII="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.9">
          <path
            className={style['cls-21']}
            d="m717.77,289.51h0c-12.41-20-6.33-46.08,13.67-58.49h0c9.62-5.82,21.01-7.85,32.15-5.32,11.14,2.53,20.51,9.37,26.33,18.99h0c12.41,20,6.33,46.08-13.67,58.49h0c-20,12.41-46.08,6.33-58.49-13.67Z"
          />
          <path
            className={style['cls-2']}
            d="m717.77,289.51h0c-12.41-20-6.33-46.08,13.67-58.49h0c9.62-5.82,21.01-7.85,32.15-5.32,11.14,2.53,20.51,9.37,26.33,18.99h0c12.41,20,6.33,46.08-13.67,58.49h0c-20,12.41-46.08,6.33-58.49-13.67Z"
          />
        </g>
        <g className={style['cls-14']}>
          <image
            className={style['cls-25']}
            width="61"
            height="60"
            transform="translate(727.45 239.83) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAzrAAAM6wHl1kTSAAABfElEQVRoge2Z4U2DQBiGH03/ywjdQDYQN+gIHaEbWDfQDRjBEXAD3EA36Ab1B0eKMd4d3nGkeb8nISEFvvceoNDrB4LcZKixd0speuBQMO8XNXBeYWlSBr1JORioJuuvwMmz71NEvefA9gNwF1FnURouZz9EzBUM0ZHhSt+mHHytmLQKJq2CpHTqe3oOjwWzvJSU7gpmeZG8vU1aBZNWwaRVMGkVTFoFk1bBpFXIOZ9+wf9nfw7qhetHsVZbJ0n+Ght4rVv+zShdA7vEwczhjaH7WFG2A9m7bLYM38WSt+fJ5faFc8/AbuPCx07ge+BMPQS2h2pUwL3L27p1gC/g03NcTbhb+YH/QTqOvYZL57ELFIU8ncdpjzm239xF5MbWOEq+p01aBZNWQVJ67oQj9B5fij5in+jJzlzpZub+ucj6U1Xy9jZpFUxaBZNWwaRVMGkVTFoFk1ZhOp/esvx8ufrj86VzYfD7EbhG53Gt3OMo3hYObl3uvnBuD1Tf4OAokh+pEdgAAAAASUVORK5CYII="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.8">
          <path
            className={style['cls-21']}
            d="m924.14,333.04h0c8.61-21.77,33.42-32.41,55.19-23.8h0c10.38,4.05,18.74,12.41,23.29,22.53,4.56,10.38,4.56,22.03.51,32.41h0c-8.61,21.77-33.42,32.41-55.19,23.8h0c-22.03-8.61-32.66-33.17-23.8-54.94Z"
          />
          <path
            className={style['cls-2']}
            d="m924.14,333.04h0c8.61-21.77,33.42-32.41,55.19-23.8h0c10.38,4.05,18.74,12.41,23.29,22.53,4.56,10.38,4.56,22.03.51,32.41h0c-8.61,21.77-33.42,32.41-55.19,23.8h0c-22.03-8.61-32.66-33.17-23.8-54.94Z"
          />
        </g>
        <g className={style['cls-15']}>
          <image
            className={style['cls-25']}
            width="60"
            height="60"
            transform="translate(937.64 321.5) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAYAAAAeYmHpAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAC9UlEQVRoge2a3ZWbMBBGb/bsu91B6MCkA1JBNhXEHcQdxKkgLoFUEHcQbwekgpAOSAXJw0hrFksyhhHGhnsOBy+LhvlGfyPBG4YlBdbmDFAAuTnfFSmwA0rgn+cozT2p08KN8ITUYMmpwD1S2xukhl0ByI2N0WOFVviFLh3lEvwBqBhZAJZ0F+ojQQKwd9irB+ASm71ZIkKGcCr0rK5BVXn4UM1vkAAkSDM7OB5w7X5mA5Dj7lYHxPekjbGE8Ii6AzIdv1UJjSsFngCkhIXe0tx5LgAvWlz9ZD2oq3HIcfd9QPrIBonC1vwz6/CQJccWU+AfVOrOrD33pBxrK2QrxNaU3xp7G2vnwRjf0T//zYCV+b3CH7h6dwndszC/E/pPSwWisQJ47Gmszh54hzhY4Q9ixlH4wXNPzrGGS3OooSka2rWWCr/YS2114iGW4TEzi54Kl/TpLJYTCoQGzhPait4Bnzu5MxwfqSUfIdqKtlPMH5SnDwUS4C3io6poS45kOGNiC3y5pMA8kHUgoeW6VZECk052pa/ogmOOPBS/6Lnc7SvaCn7uaacNS2Qhszp34zm0cu9Myc65Z/zUMBR7IPMtCUNLxSSCH6+IKXqNzOnN/rdEVlm5o8wT8JvIm46xRS84FZAi/fKTo0zaOEdhkvP0LHoqzKKnQkzRReNsKYG/SDrZxObUUT/H0N4NrWPfMx8a10skuyodZez+e7OMKjFFg9/5UE36yqihJXqrZCdEomVIS/RFOxfXRkv0VyU7IRLcqevF3FLzzlASHXPKsq+AXTzhXlSEyqgRc/TOgQ/m9652PQV+IHN1c1294Tg+7IhE7Jqun5vXQ3trUb8Tm9PQqTCLngqzaGVyZFpqvkkskGXld0eZPfJmtNXbx67Enqdzx/UK/25nwY3ve4+aNe5vKe/tKKm1sCkItscBpE/bdPA990sKfLN/1Aeyw+CuXIm66OxaTgzAq9niEZlLFyi9+x05L18BZ0Rcu46IivF9GTUc/wF/tFwIWC+TFwAAAABJRU5ErkJggg=="
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.15">
          <path
            className={style['cls-21']}
            d="m1076.89,502.58h0c20-12.15,46.08-5.82,58.23,14.18h0c5.82,9.62,7.6,21.27,5.06,32.15-2.53,10.89-9.62,20.25-19.24,26.33h0c-20,12.15-46.08,5.82-58.23-14.18h0c-12.15-20-5.82-46.08,14.18-58.49Z"
          />
          <path
            className={style['cls-2']}
            d="m1076.89,502.58h0c20-12.15,46.08-5.82,58.23,14.18h0c5.82,9.62,7.6,21.27,5.06,32.15-2.53,10.89-9.62,20.25-19.24,26.33h0c-20,12.15-46.08,5.82-58.23-14.18h0c-12.15-20-5.82-46.08,14.18-58.49Z"
          />
        </g>
        <g className={style['cls-18']}>
          <image
            className={style['cls-25']}
            width="55"
            height="61"
            transform="translate(1074.34 512.77) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA9CAYAAAD4S6qtAAAACXBIWXMAAAzrAAAM6wHl1kTSAAADMElEQVRoge2b7ZHaMBCGnzD8P1LBqYO4g1MHoYO4BEpwCXQQXwUhHZgOSAe+DkgFyY+VTvIn/pCxzfDOMBhbXu/y7kqrZYGw0EAKXIF/PV5Xc18UWB++BJKzB47Aa821M2LAxTsXATvgrWF8AmSBdBsFhSjis5EjxnZlQ5vxeUlOinwJsyGm6IoZwuRYmTlF19UjZQ7CsaREHFj+geKXF1p+K1KKrE3lRgqJ27samVKMkXs/M57yQTH3N84i9Z6tp3hAxHzGWZxwMR88LGwsXKYQ3hE73Ax7Cik4wbEXPNPoCd+TdAiBO9x0nYQQGAB2ibrcGtgFCS47mTWr8OB/6WMTi0+fP4wVFBgJbh0ejD0TzlojoXCxqNoGblquWfpPiJFLQg78NseD3TSYn0+EmBFu6k/HS3NPC4XTsRFNLmrXuz8szz0tcuDDHDeuz00GKvMeZK2ZEFY/1TTgFoN5QGWmgDWwN4M27pbO4E2Ui04H87LFo7oYjJmHWU01XVQUdU1oScRTupX4dBh9eyPpoFtlU7z1bv5hjs9IQltm7gh8C631ALxT3ZPuEM97A34iun8yqei2mc1YBoNJyxi7Kc7tiQ0ukf7gztWrCRADf5G43IMYqM3FZA6NAsN3TQ1ioI2r1S8JBpl5j6C4Dj6Kgbn/oW279BB4Grh2PA1cO54Grh1PA9eOp4FrxwbZXsB8+7zQ0P6HDS7J1uWRK4WtsGUgBqbmRMxyq9hdEQHfzfEJxMATbhd8nEevINjhyDpjPHOLa+T5hRSeFPVFp6Wwq6iGk0IqEq8IWXHdjTHrLxteKVW5y4VfZQSphodYtuf4QSaiGkIR8IIUzFLqPW/VyJnXqyaFxrnlQ8IWedO5FFDUtzdfkGLzmFlZe/LUCDmDEXG7b7sy4w2QnQbQdRByHFt+E4NC2LPXc/oxGeOM69Q3F6opvQzbGPCV+knANta9IO0gNh/OGuRpxDj/t8CYGYvVXZICvy26z+tID9a3t4cMwjuS9p2MQuUFOMIZb/PGtni8IuymLGRZ2FHst7YNO1np/JWZZsFQSKj+H8I3ePL+06kmmTIiinGTs/wWlXXgP7LyNBEA/7urAAAAAElFTkSuQmCC"
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.6">
          <path
            className={style['cls-21']}
            d="m1008.11,439.49h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29,0-42.28-18.99-42.28-42.28Z"
          />
          <path
            className={style['cls-2']}
            d="m1008.11,439.49h0c0-23.55,18.99-42.54,42.54-42.54h0c11.14,0,22.03,4.56,29.88,12.41,7.85,7.85,12.41,18.74,12.41,29.88h0c0,23.55-18.99,42.54-42.54,42.54h0c-23.29,0-42.28-18.99-42.28-42.28Z"
          />
        </g>
        <g className={style['cls-19']}>
          <image
            className={style['cls-25']}
            width="65"
            height="58"
            transform="translate(1023.04 415.4) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA7CAYAAADPeVzhAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAHv0lEQVRoge1av2/b6hW97HtDOxQQikwJAjB/QABuD90495e1NwjYAF0yBFwKPG9ClmYLt3ZKONhDgQyEoSHTixBNKZBAEOD4wRFCQxYjGmRYRrQo0ZZ7OoSf8pkmKVKi/F4KH4CLflzee3h577mXFGiNAFAjojoRkSAI+pI2xNiGT0SGIAh+Vf6tFQBE13U39/f33wCAYRh49epV4DhOPyamjC0ZALa2tqJutzsDANM0XwFQytq6FLDg42BhGAYURUGtVgMRgYhgGAYcx3lRwqYUhmGkKMrchiiKUFUVPytSigRfq9Xmn9VqNXS73ZllWTsFbNd83/cajQaICJIkoV6vz+3ytpvN5gkjZTgc3r8UUgBIvV7voW3b1vHx8amu6xccZFet3W6fAoDneb6u63PnR6PRmeu6m3kkOI7T5/8TBMHMtm0rCIJZ2jkZKYZhAAD29/ffxKSIlQZv2/YT3/e9LEfyUpYFpmna/OoGQTAbDof3085nWdZOt9udsQD5LAIg9nq9h47j9Mfj8Ymu65lZyEhxHKfvuu7mUqSsGnyKPZG/3+v1OsIwjABI/O9s237S7XZnLLBWq5VZV8rcmqVIASCaprnt+75nWVakaVpm8Lu7u1EYhtHe3t4PAOpFyQ3DMGI2FUVhZIhERMPh8H4QBDNJkkBE0HUdRTvNiqTUeEPS0dHRWNM0MEfYIUkSNE3DYDA4nUwmU8uydooGn0QyWE3TWLB1APNzq6qKyWQyXabwARCHw+F9vn3nkXKObMdxOqqqriX4JFzX3RyNRmfMMV3XAQDstuEyRVpkaxHiGqXEty2azeaJqqoQRXEea1zU1blzrVZr/mWn00EURWFVwSfBCiJrq+x2YYUUgFz1OWNSVADgC/d4PD6Z14y0ljUajc6yKvsKzoiu624eHh7+CAB8FlJcHMMwjKrMQB6e55l8jP1+/8z3/UdJJy+ImLw2VxRFChl/8N2IK8grq8dkFuaKu6SszWpzVQTPK8MqWnQefN9/1O/3z9Ulz/PMRUHIfAVXFIVVcHFR8Ex1MrFTr9fPBZ9UnVxgMvtv1aTkdKrFZBbt6Ux4VRkAn01Z6pHZXDRnAJCSF7V0hidVXtxzO1WrzjwsI5T29/ffxEKpzt/msiyzDlG+Lafp/iLB86pz1SK3CimVFn6+rSYPSZLQaDSwu7sbVS288oCU5U9WJyoy8RZCUgkSlwG6rqPf758BgG3bT6pQg0URC6Q6U42dTueCLqG488VY3rdk0VQUBXnziGVZkeu6I9M0t9dBSlIyd7vdWVIyUxy8ruuVzC6Z06JlWTuTyWQ6GAxO1z2kLRN8EASzeILeCYJgxmuH0ntTAOJkMpmyiitJEksvmftNfV2kJINvt9unecGPx+MT27atXq/3kNc7vJokyt9vpDrBF8giFReAbJrmtuu6I7bLKEsKgBo/PjebzZMqFi2O47xgA2WZvSk5jtMxDOPcH23bflKIRfoistiCJ6/Vsm5j27ZVtCWWXb0lL2yhLpJMpcLsFSAlT38kpXgy+MPDwx+X3jt+9qM2mUymrKvkZrnrupuDweA0WVyWJSHFmQukyLJ8jhR+Pc9toqsSZFJSaV5oqwDk5GAyGo3cqpxIcUrhZwB2aJrGFkLims5bT8qBc23VcZwX/BMlvg1VLZSSVyZ5FBqRy5/zXIfjhVecgQoRfRmwFvXmVUlByvKHz8KyT8QWBb+3t/dDGIbR7u5ulNZ+ZVlmq8EvLd00ze0wDKMswSLL8lw9ep7nl1WPaW3506dP/2V1ot1uny5coy2wX0R48SrY8zw/UxYAqL9///75ZDKZZjHJa4JYOywUSpZl7bTb7VMWKBvRGRGvX7/+TxRFYdEnYmWCXzmz+XuL3Vd5pGSpR9M0t9P2hY7jdHgiAKiLKnsR1cnOQ3GmVVbrPo/2jblMLSOpfd9/FATBvP7wxTCFCBmANB6PT9jnbMbhx+481cnab9LuSgRkEQGgsWjOYOqx1Woha1+YRgTRxalXVdVU1Zm1A7Usy74sImTuu4XDF1H6vjCLCKKLAi8ZfN4a8N27dwdlifh2RY5IEASDiIyYFHljY+Ovd+7c+eN0Ov3Vs2fPvtV1nWRZpsePHxMRfScIQqeI3WvXrv3dsqzfvnz58ncPHjz4RpIkunfv3tnt27e/OTg4+Lcoiv8gIuPWrVuVvFO1MhE8BEFoEVGL6LNw2tjY+Nvdu3d/Px6PbSL6vigJDDdu3PjT4eGh9vTp0z8Q0ceqg+dRKRE84qD/vKqdmzdvqkSkru5RPn6x7hN8LbgiIsYVETGuiIhxRUSMKyJiXBERYykdcXR0dBfAgSAIBxX7szIA1D9+/PgbTdOo0+nQ9evXf1nkf6UzotFo0PPnz/9yfHzcS3uo8lOAn3fevn37r62trV8rikKKotCHDx+mVZ5ItiwrSg5A/MJjGVLyhq4CPi1cIMmyDM/z/EqX0Ht7e//MeghDS5JShoh4ITPfQ2Zto5LTaZWLZ96ZQm/IFSVlERFFV3HrehPv0kjJ2FCVCp49NizzXvjagALvP1MKKaPRyOWJ8DzPLLKBvuw3dJYC4qfa/PvPeaSwbVaj0cCijfnPPvgsFE3z5PF/EXwWFpGyzLOSrx5JUgBgne9efTW4lDZ3hWL4H61mvTG0UhNtAAAAAElFTkSuQmCC"
          />
        </g>
        <g id="g18bc7ff2a6e_1_225.12">
          <path
            className={style['cls-21']}
            d="m1090.17,618h0c11.14-20.51,36.96-28.1,57.47-16.71h0c9.87,5.32,17.22,14.43,20.25,25.32s1.77,22.28-3.54,32.15h0c-11.14,20.51-36.96,28.1-57.47,16.71h0c-20.51-11.14-28.1-36.97-16.71-57.47Z"
          />
          <path
            className={style['cls-2']}
            d="m1090.17,618h0c11.14-20.51,36.96-28.1,57.47-16.71h0c9.87,5.32,17.22,14.43,20.25,25.32s1.77,22.28-3.54,32.15h0c-11.14,20.51-36.96,28.1-57.47,16.71h0c-20.51-11.14-28.1-36.97-16.71-57.47Z"
          />
        </g>
        <g className={style['cls-20']}>
          <image
            className={style['cls-25']}
            width="61"
            height="41"
            transform="translate(1099.21 622.45) scale(.86)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAqCAYAAAAAsVPKAAAACXBIWXMAAAzrAAAM6wHl1kTSAAAC6ElEQVRoge2Z7XmbMBDHf+nj72WD0gniDapukG5AJwidoGQDZwMyQekEVTegG5AN7AnSDydVGPMmgXFw838ePcaATnen071xgz8i4A6IA+bOAW3GoiiBlwuPeIoAG8/3FXALHBBtl1MWD0ACfDC/WSgRX6EtSsTEl4ZChJ6Ed9P5WB98d1oDjyxv1rMixLzT2blYGFboLRKKQlCZsRpsEIf0YwKNA6K0ag6GlsAGOac/Cd/pkhUJDCL0nsuEn4vhLWStCIrhjGwP7NoeNIVOzPBByfJh7JMZQ4hp4e2m8b9EcmsfLOm9NSLsb/orrQi4N9cfafDW3GmFCOCDqkl0AWiGzXuLKGjHyh21RkrLbMS7W1wpquoPrtl7l8CTuT5yaH3eO2Kcgyp4vQVIipj2LeKg86EJmnFdjD3h2ZwvLE+Zx5yMBp99O53SEecayA3B14oM13FJmdBxuRQ0/jsNYuL/+mshjmxKGXopFEhsB0h8hY4Rbefz8bMYtL0IEfo969vpI1xznO7Em9D/C85ZTyskLtbPf8E8cT1Cwpaq3asMbT2R9gkUEuv6CEf0Z3MV/pWcRR9dO7oSqsw8z85h3gWuwH8EPpvxDXhGMiPN9K+ez8BXQ/sLLg7fMy6THA2Fy2PbdivBabzteYT76pkHrG/natrDZlpbX9XuK8PzC5A2OydjsEdi9YFTjSbITj7QnSoq4Je5fvBY13ZDDoiVdPkFzXF3xVZZAH9o1NZjcYfTWtcYOrPVwPy+UQzQTjrmaUZUWV0oEKGSlmffzW81QKNCLOJpxLsWCtnBMbRBznxurs9a81eIVvt6UhHjLaKOxMwZYn7HOIuYDTnDjGW40OWDGKesLqVGuKOXeNIPRlxbtODUw2Y4xkN65TkuejQF3+K8e9Wy9lmRcOpANMfOLw+kXQ95VjhLv96+Ck1+JkHR7qH3TG/XRLhz2+ahBwUOidM+2CIKsKmpnpF2hPs4URna1Yz0rwt/ASHPFbK2xtHlAAAAAElFTkSuQmCC"
          />
        </g>
      </svg>
    </figure>
  )
}
