import { login } from "@/redux/auth/auth-operations";
import { store } from "@/redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import s from "./LoginForm.module.scss";
export type LoginFormProps = {};
const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userDirty, setUserDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [userError, setUserError] = useState("Username can't be empty");
    const [passwordError, setPasswordError] = useState(
        "Password must contain at least 1 symbol"
    );

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "user":
                setUserDirty(true);
                break;
            case "password":
                setPasswordDirty(true);
                break;
        }
    };
    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        const re = /^(?!\s)(?!.*\s$).{1,250}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setUserError(
                "Username must include 1-250 symbols without spaces  Plaese, check it again!"
            );
        } else {
            setUserError("");
        }
    };
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 1 || e.target.value.length > 128) {
            setPasswordError(
                "Password shoul be 1-128 symbols  Please, try again)"
            );
            if (!e.target.value) {
                setPasswordError("Password must contain at least 1 symbol");
            }
        } else {
            setPasswordError("");
        }
    };
    const dispatch = useDispatch<typeof store.dispatch>();
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(login({ username, password }) as unknown as AnyAction);
    }
    return (
        <>
            <form className={s.login} onSubmit={handleSubmit}>
                <div className={s.loginBox}>
                    <div className={s.loginHeader}>Login</div>
                    <div className={s.inputs}>
                        {userDirty && userError && (
                            <div style={{ color: "red" }}>{userError}</div>
                        )}
                        <input
                            name="user"
                            className={s.email}
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                userHandler(event);
                            }}
                            onBlur={(e) => blurHandler(e)}
                        />
                        {passwordDirty && passwordError && (
                            <div style={{ color: "red" }}>{passwordError}</div>
                        )}
                        <input
                            className={s.password}
                            placeholder="Enter your password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                passwordHandler(event);
                            }}
                            onBlur={(e) => blurHandler(e)}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            type="submit"
                            className={s.btn}
                            onClick={() => {
                                console.log(username, password);
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default LoginForm;
