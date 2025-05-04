import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckNotLogged = (OriginComponent) => {
  const ExtendsComponent = () => {
    const logged = useSelector(({ Auth }) => Auth.login.logged);
    return logged ? <OriginComponent /> : <Navigate to="/Login" />;
  };
  return ExtendsComponent;
};

export default CheckNotLogged;
