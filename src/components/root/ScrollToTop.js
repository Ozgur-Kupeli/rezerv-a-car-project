import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //
  //
  // açılan komponentleri en üstten(scroll 0 yaparak) gösterir
  //
  //
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
