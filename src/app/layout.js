"use client";

import { ThemeProvider } from "@/components/theme-provider";

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import "./globals.css";
import SwitchTheme from "@/components/SwitchTheme";
import Image from "next/image";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fontFamily, SetFontFamily] = useState("font-sans");

  // Simulate loading delay for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={` dark:bg-[#070707] text-[#404040] dark:text-bg-milk bg-[#efecf0] w-full mx-auto py-0  lg:w-[80%] md:w-[80%]`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className=" justify-between w-[80%] mx-auto py-0  lg:w-[50%] md:w-[75%] flex align-middle flex-col  ">
              <div className=" w-full flex px-3 flex-row  ">
                <div className="w-[20%]  dark:text-[#f4f6fa] align-middle">
                  {/* icon */}
                  <Image
                    src={"/image.png"}
                    alt="logo"
                    width={50}
                    height={50}
                    className="md:ml-5 mt-2 p-1"
                  />
                </div>
                <div className="flex lg:text-[16px] md:text-[16px] flex-row ml-1 relative gap-3 w-[80%] justify-between md:justify-end lg:justify-end ">
                  <div className=" w-[25%] flex text-[14px] lg:text-[16px] md:text-[16px] align-middle dark:bg-[#040404]">
                    {/* font selector */}
                    <select
                      onChange={(e) => SetFontFamily(e.target.value)}
                      className="px-2 bg-[#efecf0]  mt-2   mx-auto outline-none text-bg-dark font-[400]  align-middle dark:bg-[#040404] dark:text-[#f4f6fa]"
                    >
                      <option
                        value={"font-sans"}
                        className="px-2 mt-0 outline-none shadow-lg rounded-sm dark:outline-[#744597] border-2 mx-auto w-full"
                      >
                        Sans Serif
                      </option>
                      <option
                        value={"font-serif"}
                        className="px-2 mt-0 outline-none shadow-lg rounded-sm dark:outline-[#744597] border-2 mx-auto w-full"
                      >
                        Serif
                      </option>
                      <option
                        value={"font-mono"}
                        className="px-2 mt-0 outline-none shadow-lg rounded-sm dark:outline-[#744597] border-2 mx-auto w-full"
                      >
                        Mono
                      </option>
                    </select>
                  </div>
                  <div className="mr-0 justify-self-center align-middle my-auto w-[45%]">
                    <SwitchTheme />
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div
                  className={`${fontFamily} w-full mx-auto py-0  lg:w-[80%] md:w-[80%]`}
                >
                  {children}
                </div>
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
