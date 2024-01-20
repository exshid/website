import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  return (
    <footer className="border-t">
      <div className="flex justify-between items-center">
        {/* social icons */}
        <Social source={social} className="social-icons" />
        {/* footer menu */}
        <ul className="space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link href={menu.url} className="p-4 text-black hover:text-[gray]">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* copyright */}
        {markdownify(copyright, "p", "text-black")}
      </div>
    </footer>
  );
};

export default Footer;
