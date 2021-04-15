import React from "react";
import { handleFormData } from "../utils";
import Button from "./button";
import Input from "./input";
import styles from "./Components.module.css";

export const emailKey = "email";
export const passwordKey = "password";

const EmailForm: React.FC<
  Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    onSubmit: (data: Record<string, string>) => void;
  }
> = (props) => (
  <form
    {...props}
    onSubmit={(e) => props.onSubmit(handleFormData(e))}
    className={styles.form}
  >
    <Input label="E-mail" name="email" />
    <Input label="Heslo" name="password" type="password" />
    <Button type="submit" title="Přihlaš se" />
  </form>
);

export default EmailForm;
