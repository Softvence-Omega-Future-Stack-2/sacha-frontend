import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../redux/featuresAPI/auth/auth.slice";

export const useAuth = () => {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    return useMemo(
        () => ({
            user,
            token,
            isAuthenticated: !!token,
            isTenant: user?.role === "tenant",
            isOwner: user?.role === "owner",
            role: user?.role,
        }),
        [user, token]
    );
};
