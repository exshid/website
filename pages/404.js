import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";

const notFound = () => {
  return (
    <Base title={`Not Found - ${title} `}>
    <NotFound />
    </Base>
  );
};

export default notFound;
