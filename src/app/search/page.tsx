/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Suspense } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { basicGetApi } from "../config/axios";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/global-components/EventCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

const SearchContent = () => {
  const [allLocation, setAllLocation] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [pricemin, setPricemin] = useState<string>("");
  const [pricemax, setPricemax] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const router = useRouter();
  const params = useSearchParams();

  const getAllLocation = async () => {
    try {
      const response = await basicGetApi.get("/event/location");
      if (response.data.result) {
        setAllLocation(response.data.result);
      } else {
        throw new Error("Error get location");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async (url: string) => {
    try {
      const response = await basicGetApi.get(`${url}`);
      const filteredData = response.data.result;
      console.log("Ini response: ", filteredData);
      setFilterData(filteredData.events);
      setTotalPage(filteredData.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const theUrl = `/search?${params.toString()}`;
    getEvent(theUrl);
  }, [params]);

  useEffect(() => {
    getAllLocation();
    const pageFromQuery = parseInt(params.get("page") || "1");
    setCurrentPage(pageFromQuery);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set("page", currentPage.toString());
    router.push(`/search?${searchParams.toString()}`);
  }, [currentPage, params]); // Trigger when page or params change

  const dynamicQuery = (key: string, value: string, condition?: string) => {
    const searchParams = new URLSearchParams(params.toString());
    const valueUpdate = searchParams.get(key); //Ini value query yang sudah ada

    console.log("ini value update", valueUpdate);
    console.log("ini key", key);
    console.log("ini value", value);

    console.log("ini todate:", toDate);
    //Hapus value sebelumnya

    if (value && key !== "pricemin" && key !== "pricemax" && !condition) {
      if (valueUpdate) {
        // Jika query sudah ada, maka cek dan tambah value baru
        const newValuesUpdate = valueUpdate.split(",");
        if (!newValuesUpdate.includes(value)) {
          newValuesUpdate.push(value); //Tambah value ke array, kalau belum ada
          searchParams.set(key, newValuesUpdate.join(","));
        }
      } else {
        searchParams.set(key, value); // Tambah query dan value baru
      }
    } else if (key === "startdate" || key === "enddate") {
      if (key === "startdate" && fromDate) {
        searchParams.set("startdate", fromDate);
      }
      if (key === "enddate" && toDate) {
        searchParams.set("enddate", toDate);
      }
    } else if (condition === "deleted") {
      if (valueUpdate) {
        const currentValues = searchParams.get(key)?.split(",") || [];
        console.log("Ini current value", currentValues);
        const filteredValues = currentValues.filter(
          (values: any) => values !== value
        );
        console.log("filteredValues", filteredValues);

        if (filteredValues.length > 0) {
          searchParams.set(key, filteredValues.join(","));
        } else {
          searchParams.delete(key);
        }
      }
    }
    router.push(`?${searchParams.toString()}`);
  };

  //Handle checkbox filter

  const handlingFilter = (id: string, e: any) => {
    if (e.target.checked) {
      dynamicQuery(id, e.target.value);
    } else {
      dynamicQuery(id, e.target.value, "deleted");
      console.log("deleted");
    }
  };

  const isChecked = (key: string, value: string) => {
    const values = params.get(key)?.split(",") || [];
    if (values.includes(value)) {
      return true;
    }
    return false;
  };

  //Price
  const handlePriceFilterPriceMin = (e: any) => {
    setPricemin(e.target.value);
  };

  const handlePriceFilterPriceMax = (e: any) => {
    setPricemax(e.target.value);
  };

  const setPrice = () => {
    // if (Number(pricemin) > Number(pricemax)) {
    //   alert("Price From should not be greater than Price To.");
    //   return;
    // }
    const searchParams = new URLSearchParams(params.toString());

    if (pricemin) {
      searchParams.set("pricemin", pricemin);
    } else {
      searchParams.delete("pricemin");
    }

    if (pricemax) {
      searchParams.set("pricemax", pricemax);
    } else {
      searchParams.delete("pricemax");
    }

    router.push(`?${searchParams.toString()}`);
  };

  //Date
  const handlingDateFilterFrom = (e: any) => {
    setFromDate(e.target.value);
  };

  const handlingDateFilterTo = (e: any) => {
    setToDate(e.target.value);
  };

  const setDate = () => {
    // if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
    //   alert("Start Date should not be later than End Date.");
    //   return;
    // }
    const searchParams = new URLSearchParams(params.toString());
    if (fromDate) {
      searchParams.set("startdate", fromDate);
    } else {
      searchParams.delete("startdate");
    }

    if (toDate) {
      searchParams.set("enddate", toDate);
    } else {
      searchParams.delete("enddate");
    }

    router.push(`?${searchParams.toString()}`);
  };

  //Searchbar
  const handleSearch = (e: any) => {
    setSearchWord(e.target.value);
  };

  const setSearch = () => {
    const searchParams = new URLSearchParams(params.toString());
    if (searchWord) {
      searchParams.set("keyword", searchWord);
    } else {
      searchParams.delete("keyword");
    }
  };

  console.log("Ini filterdata:", filterData);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-10">
        <div>
          {" "}
          <form onSubmit={setSearch}>
            <Input
              placeholder="Search event here.."
              startContent={<IoSearchOutline />}
              type="text"
              name="keyword"
              className="border-none w-full active:border-blue-600"
              onChange={(e) => handleSearch(e)}
            />
          </form>
        </div>
        <div className="container lg:grid lg:grid-cols-4">
          <div className="filter w-full p-4">
            <div>
              <h1 className="text-xl font-bold">Filter</h1>
            </div>
            <div>
              <Accordion type="multiple">
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Music</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Music"
                        value="Music"
                        checked={isChecked("cat", "Music")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Festival</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Festival"
                        value="Festival"
                        checked={isChecked("cat", "Festival")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>International</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="International"
                        value="International"
                        checked={isChecked("cat", "International")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Nature</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Nature"
                        value="Nature"
                        checked={isChecked("cat", "Nature")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Adventure</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Adventure"
                        value="Adventure"
                        checked={isChecked("cat", "Adventure")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Foodies</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Foodies"
                        value="Foodies"
                        checked={isChecked("cat", "Foodies")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Health</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Health"
                        value="Health"
                        checked={isChecked("cat", "Health")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Travel</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="Travel"
                        value="Travel"
                        checked={isChecked("cat", "Travel")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                      <label>Pop Culture</label>
                      <input
                        type="checkbox"
                        id="category"
                        name="PopCulture"
                        value="PopCulture"
                        checked={isChecked("cat", "PopCulture")}
                        onChange={(e) => handlingFilter("cat", e)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="location">
                  <AccordionTrigger>Location city and country</AccordionTrigger>
                  <AccordionContent>
                    {allLocation &&
                      allLocation
                        .map((value: any, index: number) => {
                          return (
                            <div className="flex justify-between" key={index}>
                              <h3>{value.city_name}</h3>
                              <input
                                type="checkbox"
                                id="location"
                                name={`${value.city_name}`}
                                value={`${value.city_name}`}
                                checked={isChecked(
                                  "city",
                                  `${value.city_name}`
                                )}
                                onChange={(e) => handlingFilter("city", e)}
                              />
                            </div>
                          );
                        })
                        .slice(0, 5)}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center w-fit">
                      <input
                        type="number"
                        id="price"
                        name="pricemin"
                        className="border rounded-sm p-2 shadow-sm"
                        placeholder="Price from Rp..."
                        value={pricemin}
                        onChange={(e) => handlePriceFilterPriceMin(e)}
                      />{" "}
                      -
                      <input
                        type="number"
                        id="price"
                        name="pricemax"
                        className="border rounded-sm p-2 shadow-sm"
                        placeholder="Price to Rp..."
                        value={pricemax}
                        onChange={(e) => handlePriceFilterPriceMax(e)}
                      />
                    </div>
                    <Button onClick={setPrice}>Set Price</Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="date">
                  <AccordionTrigger>Date</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center w-full">
                      <input
                        type="date"
                        id="price"
                        name="startdate"
                        className="border rounded-sm p-2  shadow-sm"
                        placeholder="Price from Rp..."
                        onChange={(e) => handlingDateFilterFrom(e)}
                      />
                      <input
                        type="date"
                        id="price"
                        name="enddate"
                        className="border rounded-sm p-2  shadow-sm"
                        placeholder="Price to Rp..."
                        onChange={(e) => handlingDateFilterTo(e)}
                      />
                    </div>
                    <Button onClick={setDate}>Set Date</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="product w-full p-4 col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterData && filterData.length > 0 ? (
                filterData.map((value: any, index: number) => {
                  return (
                    <EventCard
                      key={index}
                      eventTitle={value.title}
                      eventImg={value.imgEvent}
                      eventStartDate={value.startDate}
                      eventPrice={
                        (filterData.length > 0
                          ? Math.min(
                              ...filterData[index].ticket_types.map(
                                (ticket: any) => ticket.price
                              )
                            )
                          : 0) as any
                      }
                      eventOrganizerName={value.organizer.organizer_name}
                      eventOrganizerProfile={value.organizer.organizer_logo}
                      onClick={() => {
                        router.push(`/event/${value.title}`);
                      }}
                      size="w-full"
                    />
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center p-10">
                  <h1 className="text-xl font-bold">No Data Founded.</h1>
                </div>
              )}
            </div>
            <div className="py-6 lg:py-8 flex justify-center items-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage === 1) {
                          return;
                        } else {
                          setCurrentPage(currentPage - 1); // Decrease the page
                        }
                      }}
                      className="cursor-pointer"
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPage }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(index + 1);
                        }}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {totalPage > 5 && currentPage < totalPage - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage === totalPage) {
                          return;
                        } else {
                          setCurrentPage(currentPage + 1); // Increase the page
                        }

                        console.log("Ini current page :", currentPage);
                        console.log("Ini total page :", totalPage);
                      }}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
