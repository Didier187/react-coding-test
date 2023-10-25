import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import FormError from "../form-error/FormError";
import styles from "./Login.module.css";
import Progress from "../icons/Progress";
import Toggler from "../toggler/Toggler";
import EyeClose from "../icons/EyeClose";
import EyeOpen from "../icons/EyeOpen";
interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const [serverError, setServerError] = useState("");
  const token = useBoundStore((state) => state.token);

  const setToken = useBoundStore((state) => state.changeToken);
  const navigate = useNavigate();
  const valideToken = async () => {
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/validate`, {
      headers: {
        "x-auth-token": token,
      },
    });
  };

  useEffect(() => {
    //fetch token and see if it's valid
    if (token) {
      valideToken()
        .then((response) => {
          if (response.name === "TokenExpiredError") {
            setToken("");
            navigate("/login");
          } else {
            navigate("/questions");
          }
        })
        .catch((error) => {
          console.log("error", error);
          setToken("");
        });
    }
  }, [token, navigate, setToken]);

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
            <Toggler>
              {({ isToggled, setIsToggled }) => (
                <div className={styles["toggle-show-password"]}>
                  <input
                    id="password"
                    placeholder={isToggled ? "********" : ""}
                    type={isToggled ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button
                    onClick={() => setIsToggled(!isToggled)}
                    type="button"
                  >
                    {isToggled ? <EyeClose /> : <EyeOpen />}
                  </button>
                </div>
              )}
            </Toggler>
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
