import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Button",
  decorators: [
    withKnobs({
      escapeHTML: false,
    }),
  ],
};

export function Default() {
  return <button className="button">{text("Label", "I'm a button!")}</button>;
}

export function LinkAsButton() {
  return (
    <a href="https://lightbase.nl/" className="button">
      {text("Label", "I'm a button!")}
    </a>
  );
}

export function Red() {
  return <button className="button bg-red-500 hover:bg-red-600">{text("Label", "I'm a button!")}</button>;
}

export function Blue() {
  return <button className="button bg-blue-500 hover:bg-blue-600">{text("Label", "I'm a button!")}</button>;
}

export function Dark() {
  return <button className="button bg-dark-500 hover:bg-dark-600">{text("Label", "I'm a button!")}</button>;
}

export function Disabled() {
  return (
    <button className="button" disabled>
      {text("Label", "I'm a button!")}
    </button>
  );
}
