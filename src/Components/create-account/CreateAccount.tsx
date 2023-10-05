import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import styles from "./CreateAccount.module.css";
import FormError from "../form-error/FormError";
import { useState } from "react";
import axios from "axios";
import { useBoundStore } from "../../store";
import EyeOpen from "../icons/EyeOpen";
import EyeClose from "../icons/EyeClose";
import Progress from "../icons/Progress";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const setToken = useBoundStore((state) => state.changeToken);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/users`, data)
      .then((response) => {
        setToken(response.data.token);
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
      <h1>Create Account</h1>
      <div className={styles["form-container"]}>
        <div className={styles["server-error"]}>
          {serverError && <p>{serverError}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-field"]}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              autoCapitalize="true"
              placeholder="John Smith"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name", { required: true })}
            />
            <FormError
              isVisible={errors.name}
              errorMessage="This field is required"
            />
          </div>
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
                  minLength: 8,
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
              errorMessage={
                errors.password && errors.password.type === "required"
                  ? "This field is required"
                  : "Password must be at least 8 characters long"
              }
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Progress />}
            Create Account
          </button>
        </form>
      </div>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}
