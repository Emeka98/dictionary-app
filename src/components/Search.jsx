"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import Error from "next/error";
import { FaPlay } from "react-icons/fa6";
import Loading from "./Loading";

const Search = () => {
  const [searchTerm, SetSearchTerm] = useState("");
  const [wordDetails, SetWordDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  async function fetchWordData(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const entry = data[0];

      const wordDetails = {
        word: entry.word,
        phonetics: entry.phonetics.map((phonetic) => ({
          text: phonetic.text,
          audio: phonetic.audio,
          sourceUrl: phonetic.sourceUrl,
          license: phonetic.license,
        })),
        meanings: entry.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((def) => ({
            definition: def.definition,
            example: def.example,
            synonyms: def.synonyms,
            antonyms: def.antonyms,
          })),
        })),
      };
      return wordDetails;
    } catch (error) {
      console.error("Error fetching word data:", error);
      return null;
    }
  }
  // custom audio play function
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };
  // form function
  const onSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWordData(searchTerm);
      SetWordDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  // capitalise first letter
  const capitalize = (word) => {
    if (!word) {
      return "";
    } else return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <section className="w-full mx-auto py-0 dark:text-[#dad9db] lg:w-[80%] md:w-full">
      <div className="input-div w-full flex flex-col py-4 gap-4">
        <form className="flex flex-col justify-center" onSubmit={onSearch}>
          <div className="bg-[#efecf0] dark:bg-[#efecf0] dark:text-[#dad9db] py-0 px-2 w-full flex flex-row gap-1 rounded-full border-2 shadow-md border-bg-milk">
            <input
              value={searchTerm}
              onChange={(e) => {
                SetSearchTerm(e.target.value);
                setIsLoading(true);
              }}
              className="dark:text-bg-dark text-[#7c7c7c] rounded-full focus:bg-[#efecf0]  bg-[#efecf0]  px-2 w-[90%] outline-none border-none"
              type="text"
              placeholder="Search"
            />
            <div className="search-icon w-[40px] h-[40px] bg-[#efecf0] mr-1 rounded-full items-center justify-center flex align-middle p-2">
              <button
                onClick={() => setIsLoading(false)}
                className="text-[#7c7c7c] dark:text-[#744597] font-bold outline-none outline-0 p-2 border-none text-[36px] items-center align-middle"
              >
                <IoIosSearch />
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {searchTerm ? (
            <>
              {wordDetails ? (
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex flex-row justify-between mt-2">
                    {/* word and audio section */}
                    <h2 className="text-[36px] font-bold">
                      {capitalize(wordDetails.word)}
                    </h2>
                    {/* audio player section */}
                    <div className="flex flex-row gap-2  align-middle justify-center items-center">
                      {wordDetails.phonetics.map(
                        (phonetic, index) =>
                          phonetic.audio && (
                            <button
                              key={index}
                              className="px-2 rounded-full w-[36px] h-[36px] text-[#f4f6fa] flex justify-center align-middle items-center bg-[#9463b6] dark:bg-[#744597] shadow-xl border-1 text-[16px]"
                              onClick={() => playAudio(phonetic.audio)}
                            >
                              <FaPlay className="bg-[#9463b6] dark:bg-[#744597]  w-[16px] h-[16px] text-[16px]" />
                            </button>
                          )
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-4 ">
                    {wordDetails.phonetics.map((phonetic, index) => (
                      <p
                        key={index}
                        className=" text-[#9463b6] ml-0 text-left flex dark:text-[#744597]"
                      >
                        {phonetic.text}
                      </p>
                    ))}
                  </div>
                  {wordDetails.meanings.map((meaning, index) => (
                    <div key={index}>
                      <h2 className="font-semibold mt-0 text-[20px]">
                        {meaning.partOfSpeech}
                      </h2>
                      <div className="meaning-section relative">
                        <p>Meaning</p>
                        {meaning.definitions.map((definition, defIndex) => (
                          <>
                            <ul
                              className="before:left-0 before:my-auto before:mr-4 before:absolute before:align-middle before:flex before:justify-self-center  before:content-[''] before:mt-2 before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#744597] pl-3 text-justify"
                              key={defIndex}
                            >
                              <li className="font-[400]  flex  gap-3  ">
                                {definition.definition}
                              </li>
                              {definition.example && (
                                <em className="ml-4 ">
                                  {" "}
                                  Usage: {definition.example}
                                </em>
                              )}
                            </ul>
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="syn-ant flex flex-col gap-2">
                    <div className="syn flex flex-col gap-1">
                      {/* synonyms */}
                      <span>Synonyms</span>
                      <div className="flex flex-row gap-1 text-[#9463b6] dark:text-[#744597]">
                        {wordDetails.meanings.map((meaning, index) => (
                          <div key={index}>
                            {meaning.definitions.map((definition, defIndex) => (
                              <div key={defIndex}>
                                {definition.synonyms.length > 0 && (
                                  <p> {definition.synonyms.join(", ")}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ant flex flex-col gap-2">
                      {/* Antonyms */}
                      <span>Antonyms</span>
                      <div className="flex flex-row gap-2 text-[#9463b6] dark:text-[#744597]">
                        {wordDetails.meanings.map((meaning, index) => (
                          <div key={index}>
                            {meaning.definitions.map((definition, defIndex) => (
                              <div key={defIndex}>
                                {definition.antonyms.length > 0 && (
                                  <p> {definition.antonyms.join(", ")}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* license section */}
                  <p>
                    License by:{" "}
                    {wordDetails.phonetics.map((license) => (
                      <>
                        <span className="text-[12px]">
                          {license.license && license.license.name}
                        </span>
                      </>
                    ))}{" "}
                  </p>
                  {/* source url section */}
                  <p>
                    Source:{" "}
                    {wordDetails.phonetics.map((source) => (
                      <>
                        <Link
                          className="text-[12px] underline"
                          href={`${source.sourceUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.sourceUrl && source.sourceUrl}
                        </Link>
                      </>
                    ))}
                  </p>
                </div>
              ) : (
                <p className="flex mx-auto p-2 mt-2 flex-col gap-2">
                  <span className="mx-auto mt-8">😔</span>{" "}
                  <span className="mx-auto mt-2 w-[55%] text-center">
                    Oops! No definitions were found for the word <br></br>
                    <strong>{searchTerm} </strong>
                    <br></br>
                  </span>
                  <span className="mx-auto w-[70%] text-center">
                    Please try a different search term or check the spelling of
                    the word
                  </span>
                </p>
              )}
            </>
          ) : (
            <p className="flex mx-auto p-2 mt-2">
              Start typing to check a word
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default Search;
