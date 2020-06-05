import "../src/css/tailwind.css";
import { configure } from "@storybook/react";

configure(require.context("../src/components", true, /\.story\.(tsx|mdx)$/), module);
