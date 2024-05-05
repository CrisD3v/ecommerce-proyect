// components/CookieHandler.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const CookieHandler = () => {
  const router = useRouter();

  useEffect(() => {
    // Obtener la cookie cuando se monte el componente
    const cookies = new Cookies();
    const cookieValue = cookies.get("cookieName");

    // Hacer algo con la cookie, por ejemplo, redirigir si no está presente
    if (!cookieValue && router.pathname !== "/login") {
      router.push("/login");
    }
  }, []);

  return null;
};

export default CookieHandler;
