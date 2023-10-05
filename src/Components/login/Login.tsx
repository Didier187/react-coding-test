import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import FormError from "../form-error/FormError";
import styles from "./Login.module.css";
import EyeOpen from "../icons/EyeOpen";
import EyeClose from "../icons/EyeClose";
import Progress from "../icons/Progress";

interface LoginProps {
  email: string;
  password: string;
}
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const setToken = useBoundStore((state) => state.changeToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/auth`, data)
      .then((response) => {
        setToken(response.data);
        reset();
        navigate("/questions");
      })
      .catch((error) => {
        setServerError(error.response.data);
        reset({ email: data.email, password: "" });
      });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles["form-page"]}>
      <h1>Login</h1>
      <div className={styles["form-container"]}>
        <div className={styles["server-error"]}>
          {serverError && <p>{serverError}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="john.smith@gmail.com"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <FormError
              isVisible={errors.email}
              errorMessage={
                errors.email && errors.email.type === "required"
                  ? "This field is required"
                  : "Please enter a valid email"
              }
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="password">Password</label>
            <div className={styles["toggle-show-password"]}>
              <input
                id="password"
                placeholder={showPassword ? "********" : ""}
                {...register("password", {
                  required: true,
                })}
                type={showPassword ? "text" : "password"}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button onClick={toggleShowPassword} type="button">
                {showPassword ? <EyeClose /> : <EyeOpen />}
              </button>
            </div>
            <FormError
              isVisible={errors.password}
              errorMessage={"Password is required"}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Progress />}
            Log in
          </button>
        </form>
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/create-account">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
