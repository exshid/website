import config from "@config/config.json";

import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";

const notFound = () => {
  const { title } = config.site;

  return (
    <Base title={`Not Found - ${title} `}>
    <NotFound />
    </Base>
  );
};

export default notFound;
