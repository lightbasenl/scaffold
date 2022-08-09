import * as React from "react";
import type { SVGProps } from "react";

function SvgLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1920 349"
      style={{
        width: 180,
      }}
      {...props}
    >
      <defs>
        <path id="a" d="M.775.718h269.583V332.94H.775z" />
        <path id="c" d="M0 .858h1920v331.285H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#292949" d="M468.993 19.852v254.263h-47.718V30.302l47.718-10.45" />
        <g transform="translate(502 16)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M4.257 258.115h47.718V76.648H4.257v181.467zM27.942 55.053c-7.433 0-13.818-2.666-19.157-8.011C3.44 41.703.775 35.319.775 27.885c0-7.429 2.665-13.812 8.01-19.156C14.124 3.39 20.509.718 27.942.718c7.43 0 13.813 2.672 19.157 8.011 5.339 5.344 8.01 11.727 8.01 19.156 0 7.434-2.671 13.818-8.01 19.157-5.344 5.345-11.727 8.011-19.157 8.011zm99.959 111.109c0 14.629 5.051 27.053 15.152 37.268 10.101 10.221 22.465 15.326 37.093 15.326 8.589 0 16.486-1.448 23.686-4.354 7.194-2.901 13.464-6.907 18.808-12.016v-71.403c-5.11-5.105-11.38-9.11-18.808-12.016-7.435-2.901-15.211-4.354-23.337-4.354-14.629 0-27.054 4.996-37.268 14.977-10.221 9.987-15.326 22.177-15.326 36.572zm44.931 92.997c-12.772 0-24.789-2.438-36.049-7.314-11.266-4.877-21.018-11.494-29.258-19.854-8.244-8.358-14.748-18.166-19.504-29.431-4.762-11.26-7.14-23.391-7.14-36.398 0-12.768 2.437-24.784 7.314-36.05 4.876-11.26 11.494-21.072 19.853-29.431 8.359-8.36 18.226-14.918 29.605-19.679 11.375-4.757 23.566-7.14 36.573-7.14 9.056 0 17.704 1.278 25.948 3.831a93.897 93.897 0 0123.162 10.797V76.648h47.022v181.467c0 23.913-7.723 42.373-23.163 55.38C231.75 326.496 209.519 333 180.495 333c-13.932 0-27.341-1.393-40.228-4.179-12.888-2.788-24.676-6.853-35.354-12.192l16.718-37.267c9.982 4.876 19.734 8.533 29.258 10.971 9.518 2.438 19.038 3.657 28.562 3.657 14.159 0 24.903-3.081 32.217-9.231 7.314-6.154 10.972-15.15 10.972-26.993v-14.977a82.384 82.384 0 01-23.511 12.191c-8.479 2.786-17.24 4.179-26.297 4.179z"
            fill="#292949"
            mask="url(#b)"
          />
        </g>
        <path
          d="M809.972 274.115V30.302l47.717-10.45v87.076c6.966-5.801 14.683-10.215 23.162-13.235 8.474-3.015 17.703-4.528 27.691-4.528 20.897 0 38.078 6.738 51.548 20.201 13.466 13.47 20.201 30.771 20.201 51.898v112.851h-47.717V168.23c0-11.374-3.428-20.55-10.275-27.516-6.851-6.967-15.967-10.45-27.342-10.45-7.897 0-15.037 1.568-21.42 4.703-6.389 3.134-11.668 7.608-15.848 13.409v125.739h-47.717m224.308-51.201v-90.211h-37.27V92.648h37.27V46.324L1082 35.526v57.122h51.54v40.055H1082v80.458c0 8.594 1.85 14.629 5.57 18.112 3.71 3.483 10.21 5.224 19.5 5.224 4.41 0 8.59-.288 12.54-.87 3.95-.577 8.24-1.681 12.89-3.308v39.009c-5.11 1.627-11.27 2.96-18.46 4.005-7.2 1.045-13.36 1.568-18.46 1.568-20.2 0-35.47-4.582-45.8-13.758-10.34-9.171-15.5-22.58-15.5-40.229m213.86-91.953c-8.6 0-16.61 1.453-24.04 4.354-7.43 2.906-13.81 7.14-19.15 12.714v71.401c5.1 5.111 11.43 9.177 18.98 12.191 7.54 3.021 15.61 4.528 24.21 4.528 14.85 0 27.39-5.05 37.61-15.151 10.22-10.101 15.33-22.58 15.33-37.443 0-14.857-5.17-27.342-15.5-37.443-10.34-10.101-22.81-15.151-37.44-15.151zm99.96 52.594c0 13.007-2.44 25.198-7.31 36.572-4.88 11.38-11.5 21.246-19.86 29.607-8.36 8.358-18.28 14.922-29.78 19.678-11.49 4.757-23.74 7.141-36.74 7.141-9.06 0-17.89-1.279-26.47-3.832-8.6-2.552-16.5-6.149-23.69-10.797v12.191h-47.02V30.302l47.72-10.45v87.076c7.19-5.339 15.15-9.458 23.86-12.365 8.7-2.9 17.7-4.354 26.99-4.354 12.77 0 24.78 2.439 36.05 7.315 11.26 4.877 21.07 11.494 29.43 19.854 8.36 8.359 14.92 18.231 19.68 29.605 4.76 11.38 7.14 23.57 7.14 36.572zm67.91 36.921c0 6.966 3.02 12.484 9.06 16.544 6.03 4.065 14.04 6.095 24.03 6.095 7.89 0 15.15-.985 21.77-2.96 6.62-1.97 12.71-4.817 18.29-8.534v-27.168c-5.81-2.318-11.91-4.005-18.29-5.049-6.39-1.046-13.06-1.569-20.03-1.569-10.92 0-19.45 2.035-25.6 6.096-6.15 4.065-9.23 9.579-9.23 16.545zm20.55 56.773c-19.5 0-35.41-5.165-47.72-15.5-12.31-10.329-18.46-23.738-18.46-40.229 0-17.181 6.62-30.651 19.86-40.403 13.23-9.752 31.46-14.629 54.68-14.629a144.42 144.42 0 0144.24 6.967v-12.888c0-10.449-3.26-18.34-9.76-23.684-6.5-5.339-16.02-8.012-28.56-8.012-7.66 0-15.97 1.219-24.9 3.658-8.94 2.438-19.11 6.215-30.48 11.32l-17.41-35.179c14.16-6.498 27.91-11.374 41.27-14.629 13.35-3.249 26.52-4.876 39.53-4.876 24.38 0 43.37 5.867 56.95 17.59 13.58 11.727 20.38 28.272 20.38 49.632v117.728h-47.02v-12.54c-7.67 5.344-15.74 9.29-24.21 11.843-8.48 2.552-17.94 3.831-28.39 3.831zm120.51-24.729l23.69-31.697c10.67 6.967 20.77 12.137 30.3 15.5 9.52 3.369 19.03 5.05 28.56 5.05 10.68 0 19.21-1.74 25.6-5.224 6.38-3.483 9.58-8.125 9.58-13.932 0-4.643-1.8-8.359-5.4-11.145-3.6-2.787-9.35-4.757-17.24-5.922l-34.83-5.225c-17.88-2.786-31.52-8.588-40.93-17.415-9.4-8.821-14.1-20.549-14.1-35.178 0-17.415 6.84-31.348 20.55-41.797 13.69-10.449 32.04-15.673 55.03-15.673 13.23 0 26.12 1.915 38.66 5.747 12.54 3.831 24.5 9.464 35.88 16.892l-22.99 30.651c-9.99-5.801-19.51-10.155-28.56-13.062-9.06-2.9-18.24-4.353-27.52-4.353-8.59 0-15.5 1.627-20.72 4.876-5.23 3.254-7.84 7.548-7.84 12.887 0 4.876 1.92 8.653 5.75 11.32 3.83 2.672 10.15 4.588 18.98 5.747l34.83 5.225c17.64 2.558 31.29 8.359 40.92 17.414 9.64 9.057 14.46 20.551 14.46 34.484 0 8.592-2.04 16.544-6.1 23.858-4.06 7.315-9.57 13.644-16.54 18.983-6.97 5.343-15.33 9.524-25.08 12.539-9.75 3.014-20.32 4.527-31.69 4.527-16.49 0-31.93-2.149-46.33-6.443-14.4-4.293-26.7-10.503-36.92-18.634"
          fill="#292949"
        />
        <mask id="d" fill="#fff">
          <use xlinkHref="#c" />
        </mask>
        <path
          d="M1829.09 128.871c-10.92 0-20.32 3.31-28.21 9.927-7.9 6.618-13.35 15.5-16.37 26.646h88.82c-3.02-10.678-8.54-19.446-16.55-26.298-8.01-6.845-17.24-10.275-27.69-10.275zm78.72 122.604c-11.15 9.056-22.59 15.674-34.31 19.853-11.73 4.179-24.79 6.269-39.18 6.269-13.71 0-26.53-2.438-38.49-7.315-11.96-4.876-22.29-11.493-31-19.852s-15.56-18.286-20.55-29.78c-5-11.494-7.49-23.859-7.49-37.095 0-13.002 2.38-25.252 7.14-36.746 4.76-11.494 11.32-21.475 19.68-29.954 8.36-8.473 18.29-15.151 29.78-20.028 11.49-4.876 23.74-7.314 36.75-7.314 12.76 0 24.67 2.499 35.7 7.489 11.02 4.995 20.55 11.788 28.56 20.376 8.01 8.593 14.28 18.868 18.81 30.825 4.53 11.961 6.79 24.903 6.79 38.835v12.539h-135.14c3.25 11.38 9.52 20.55 18.81 27.516 9.28 6.966 20.2 10.449 32.74 10.449 7.89 0 15.32-1.273 22.29-3.831 6.96-2.553 12.88-6.15 17.76-10.797l31.35 28.561z"
          fill="#292949"
          mask="url(#d)"
        />
        <path
          d="M87.478 16.62l-.911-.91c-19.801-19.803-51.909-19.803-71.712 0-19.803 19.803-19.803 51.91 0 71.713l35.892 35.892.104-.102 43.287 43.286 71.687-71.687L87.478 16.62"
          fill="#FF5B4B"
          mask="url(#d)"
        />
        <path
          d="M50.849 209.788l-.104-.102-35.892 35.891c-19.804 19.804-19.804 51.911 0 71.713 19.802 19.804 51.91 19.804 71.712 0l.911-.909.077.079 78.273-78.272-71.688-71.689-43.289 43.289"
          fill="#0F6EFC"
          mask="url(#d)"
        />
        <path fill="#292949" d="M165.825 94.812l-71.687 71.687 71.688 71.689 71.688-71.688-71.689-71.688" />
      </g>
    </svg>
  );
}

export default SvgLogo;