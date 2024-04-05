import React, { useState } from "react";
import Link from "next/link";
import { links } from "./MyLinks";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group hover:text-kaitoke-green-500"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${heading === link.name ? "chevron-up" : "chevron-down"
                    }`}
                ></ion-icon>
              </span>

            </h1>
            {link.submenu && (
              <div>
                <div className="z-10 absolute top-20 hidden group-hover:md:block hover:md:block">

                  <div className="bg-white shadow rounded-[7px] p-4 grid grid-cols-2 gap-10">
                    {link.sublinks.map((mysublinks) => (
                      <div>
                        <h1 className="font-semibold text-kaitoke-green-950 text-center">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink) => (
                          <li className="text-xs text-gray-700 my-2.5">
                            <Link
                              href={slink.link}
                              className="hover:text-kaitoke-green-500"
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div>
                <h1
                  onClick={() =>
                    subHeading !== slinks.Head
                      ? setSubHeading(slinks.Head)
                      : setSubHeading("")
                  }
                  className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center"
                >
                  {slinks.Head}

                  <span className="text-xl md:mt-1 md:ml-2 inline">
                    <ion-icon
                      name={`${subHeading === slinks.Head
                        ? "chevron-up"
                        : "chevron-down"
                        }`}
                    ></ion-icon>
                  </span>
                </h1>
                <div
                  className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                >
                  {slinks.sublink.map((slink) => (
                    <li className="py-3 pl-14">
                      <Link href={slink.link}>{slink.name}</Link>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;