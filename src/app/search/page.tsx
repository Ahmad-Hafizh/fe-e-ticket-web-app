
//MASIH BELUM BISA HAPUS VALUE QUERY YANG SUDAH ADA

"use client";
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

const searchPage = () => {
  const [allLocation, setAllLocation] = useState<any>([]);

  // const [url, setUrl] = useState<string>("");
  const [filterData, setFilterData] = useState<any>([]);
  const [pricemin, setPricemin] = useState<string>("");
  const [pricemax, setPricemax] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
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


  const showEvent = async (url: string) => {
    try {
      const response = await basicGetApi.get(`${url}`);

      const filteredData = response.data.result;
      setFilterData(filteredData);
      console.log("filterData", filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLocation();
  }, []);

  useEffect(() => {
    const theUrl = `/search?${params.toString()}`;
    showEvent(theUrl);
  }, [params]); //Update data ketika query berubah

  const dynamicQuery = (
    key: string,
    value: string,
    key2?: string, //optional value
    value2?: string //optional value
  ) => {
    const searchParams = new URLSearchParams(params.toString());
    console.log("ini search params:", searchParams);
    console.log("iniserachparamsvalue: ", searchParams.values());

    const valueUpdate = searchParams.get(key); //Ini value query yang sudah ada

    console.log("ini value update", valueUpdate);
    console.log("ini key", key);
    console.log("ini value", value);

    console.log("ini todate:", toDate);
    //Hapus value sebelumnya

    if (value && key !== "pricemin" && key !== "pricemax") {
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
    } else if (key === "pricemin" || key === "pricemax") {
      //udah beres
      if (pricemin) {
        searchParams.set("pricemin", pricemin);
      }
      if (pricemax) {
        searchParams.set("pricemax", pricemax);
      } else {
        if (!pricemin) {
          searchParams.delete("pricemin");
        }
        if (!pricemax) {
          searchParams.delete("pricemax");
        }
      }
    } else if (key === "startdate" || key === "enddate") {
      if (key === "startdate" && fromDate) {
        searchParams.set("startdate", fromDate);
      }
      if (key === "enddate" && toDate) {
        searchParams.set("enddate", toDate);
      }
    } else if (value === "") {
      // Masih gabisa delete query yang ada
      if (valueUpdate) {
        // const newValuesUpdate = valueUpdate
        //   .split(",")
        //   .filter((item: string) => item !== value);
        // console.log("new valuessssss", newValuesUpdate);
        // const newValue = newValuesUpdate.filter(
        //   (item: string) => item !== value
        // );
        // console.log("new value", newValue);

        const currentValues = searchParams.get(key)?.split(",") || []; // <<== GPT, dan masih blm bisa juga
        const filteredValues = currentValues.filter((item) => item !== value); // Use the latest searchParams
        console.log("filteredValues", filteredValues);

        if (filteredValues.length >= 0) {
          searchParams.set(key, filteredValues.join(","));
        } else {
          searchParams.delete(key);
        }
      }

    }
    router.push(`?${searchParams.toString()}`);
  };

  const handlingFilter = (id: string, event: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dynamicQuery(id, event.target.value);
    } else if (!isChecked) {
      dynamicQuery(id, "");
    }
  };

  const handlePriceFilter = (e: any) => {
    if (e.target.name === "pricemin") {
      setPricemin(e.target.value);
      console.log("pricemin", pricemin);
    } else {
      setPricemax(e.target.value);
    }
  };

  const setPrice = () => {
    console.log("pricemin", pricemin);
    console.log("pricemax", pricemax);
    dynamicQuery("pricemin", pricemin);
    dynamicQuery("pricemax", pricemax);
  };

  const handlingDateFilter = (e: any) => {
    if (e.target.name === "startdate") {
      setFromDate(e.target.value);
      console.log("fromdate", fromDate);
    } else {
      setToDate(e.target.value);
    }
  };

  const setDate = () => {
    dynamicQuery("startdate", fromDate);
    dynamicQuery("enddate", toDate);
  };

  useEffect(() => {
    if (fromDate || toDate) {
      dynamicQuery("startdate", fromDate);
      dynamicQuery("enddate", toDate);
    }
  }, [fromDate, toDate]);

  return (
    <div className="bg-white w-full h-full px-10 md:px-32 lg:px-48 py-10 flex flex-col gap-20 border border-red-500">
      <div className="container lg:grid lg:grid-cols-4">
        <div className="filter w-full p-4">
          <div>
            <h1>Filter</h1>
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
                      onChange={(e) => handlingFilter("cat", e)}
                    />
                  </div>
                  <div className="flex gap-2 justify-between items-center">
                    <label>Food</label>
                    <input
                      type="checkbox"
                      id="category"
                      name="Food"
                      value="Food"
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
                      onChange={(e) => handlePriceFilter(e)}

                    />{" "}
                    -
                    <input
                      type="number"
                      id="price"

                      name="pricemax"
                      className="border rounded-sm p-2 shadow-sm"
                      placeholder="Price to Rp..."
                      value={pricemax}
                      onChange={(e) => handlePriceFilter(e)}
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
                      onChange={(e) => handlingDateFilter(e)}

                    />
                    <input
                      type="date"
                      id="price"

                      name="enddate"
                      className="border rounded-sm p-2  shadow-sm"
                      placeholder="Price to Rp..."
                      onChange={(e) => handlingDateFilter(e)}
                    />
                  </div>
                  <Button onClick={setDate}>Set Date</Button>

                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="product w-full p-4 col-span-3">
          <div className="flex gap-1 flex-wrap justify-between">

            {filterData && filterData.length > 0 ? (

              filterData.map((value: any, index: number) => {
                return (
                  <EventCard
                    key={index}
                    eventTitle={value.title}
                    eventImg={value.imgEvent}
                    eventStartDate={value.startDate}
                    eventPrice={value.event_price}
                    eventOrganizerName={value.organizer.organizer_name}
                    eventOrganizerProfile={value.organizer.organizer_profile}
                    onClick={() => {
                      router.push(`/event/${value.title}`);
                    }}
                    size="w-1/4"
                  />
                );
              })
            ) : (
              <div className="w-full h-full border border-purple-600">
                No Data Founded.
              </div>
            )}

          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default searchPage;
