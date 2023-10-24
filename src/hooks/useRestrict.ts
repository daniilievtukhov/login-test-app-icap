import { getIsLoggedIn } from "@/redux/auth/auth-selector";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const indexPage = "/";

const useRestrict = (redirectPage = indexPage) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(redirectPage);
        }
    }, [isLoggedIn, router, redirectPage]);
};

export default useRestrict;
