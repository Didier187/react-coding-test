import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import styles from "./Header.module.css";
import { useEffect, useRef } from "react";
import useClickOutside from "../../Hooks/useClickOutSide";
import Person from "../icons/Person";
import Logout from "../icons/Logout";

export const Dropdown = () => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const resetUser = useBoundStore((state) => state.resetUser);
  const getUser = useBoundStore((state) => state.fetch);

  const currentUser = useBoundStore((state) => state.currentUser);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [show, setShow] = useState(false);
  useClickOutside({
    ref: dropDownRef,
    callback: () => setShow(false),
  });
  const signOut = () => {
    resetUser();
    navigate("/login");
    localStorage.clear();
  };
  return (
    <div className={styles.dropdown} ref={dropDownRef}>
      <button onClick={() => setShow(!show)}>
        <Person />
      </button>
      {show && (
        <div className={styles["dropdown-content"]}>
          <div className={styles["user-details"]}>
            {currentUser && (
              <span className={styles.name}>
                👋, <strong>{currentUser.name}</strong>
              </span>
            )}
            <br />

            <span className={styles.email}>
              {currentUser && currentUser.email}
            </span>
          </div>
          <div className={styles.action}>
            <button onClick={signOut} className={styles["logout-btn"]}>
              <Logout />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
