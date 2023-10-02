import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/CreateAccount.module.css";
import { useState } from "react";
import FormError from "./FormError";
import axios from "axios";
import { useBoundStore } from "../store";


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
                {showPassword ? (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                ) : (
                  <span className="material-symbols-outlined">visibility</span>
                )}
              </button>
            </div>
            <FormError
              isVisible={errors.password}
              errorMessage={"Password is required"}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <span className="material-symbols-outlined">
                progress_activity
              </span>
            )}
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
