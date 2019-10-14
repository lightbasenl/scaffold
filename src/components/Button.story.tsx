import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, ButtonLink } from "./Button";

storiesOf("Button", module)
  .add("default", () => {
    return <Button>I'm a button!</Button>;
  })
  .add("red", () => {
    return <Button variantColor="red">I'm a button!</Button>;
  })
  .add("blue", () => {
    return <Button variantColor="blue">I'm a button!</Button>;
  })
  .add("dark", () => {
    return <Button variantColor="dark">I'm a button!</Button>;
  });

storiesOf("ButtonLink", module)
  .add("default", () => {
    return <ButtonLink href="#">I'm a button!</ButtonLink>;
  })
  .add("red", () => {
    return (
      <ButtonLink href="#" variantColor="red">
        I'm a button!
      </ButtonLink>
    );
  })
  .add("blue", () => {
    return (
      <ButtonLink href="#" variantColor="blue">
        I'm a button!
      </ButtonLink>
    );
  })
  .add("dark", () => {
    return (
      <ButtonLink href="#" variantColor="dark">
        I'm a button!
      </ButtonLink>
    );
  });
