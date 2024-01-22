import Image from "next/image";
import Link from "next/link";
import Base from "@layouts/Baseof";
import config from "@config/config.json";

function InnerPage({ pageTitle, description, content }) {
  const { title } = config.site;

  return (
    <>
      <Base title={`${pageTitle} - ${title} `}>
        <div className="flex flex-col items-center divide-y">
          <div className="flex flex-col lg:flex-row py-5 p-2 w-full md:w-4/5 lg:w-[90%] xl:w-4/5">
            <div className="w-full flex flex-col justify-center p-3">
              <div className="flex"></div>
              <h1 className="font-bold text-black text-5xl">{pageTitle}</h1>
              <p className="text-2xl py-3">{description}</p>
            </div>
          </div>
          <div
            className="content-text w-full px-2 md:w-4/5 lg:w-2/3 xl:w-1/2 text-black"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Base>
    </>
  );
}
export default InnerPage;
