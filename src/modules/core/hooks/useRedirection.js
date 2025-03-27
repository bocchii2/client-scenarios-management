import { useNavigate } from "react-router-dom";

const useRedirection = () => {
  const navigate = useNavigate();

  const redirectToWithId = (url, id) => {
    navigate(`${url}/${id}`);
  };
  const redirectTo = (url) => {
    navigate(url);
  };

  return { redirectTo, redirectToWithId };
};

export default useRedirection;
