import { getIsLoggedIn } from "@/redux/auth/auth-selector";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const loginPage = "/";

const useAuth = (redirectPage = loginPage) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace(redirectPage);
        }
    }, [isLoggedIn, router, redirectPage]);
};

export default useAuth;
