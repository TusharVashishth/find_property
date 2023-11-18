"use client";
import { stateList } from "@/config/states";
import { getCities } from "@/helper";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StateCityFilter() {
  const router = useRouter();
  const [cities, setCities] = useState<Array<CityType> | []>([]);
  const [params, setParams] = useState({
    state: "",
    city: "",
  });

  const handleStateChange = (state: any) => {
    const filterCities = getCities(state);
    setParams({ ...params, state: state });
    setCities(filterCities);
  };

  const SearchProperty = () => {
    if (params.state != "" || params.city != "") {
      router.push(`/?state=${params.state}&city=${params.city}`);
    }
  };

  return (
    <div className="flex justify-center items-start flex-col  px-5 lg:px-20 mt-20">
      <h1 className="text-2xl font-bold my-3">Find properties</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 ">
        <Autocomplete
          defaultItems={stateList}
          label="States"
          placeholder="select state"
          className="text-foreground"
          onSelectionChange={handleStateChange}
        >
          {(state) => (
            <AutocompleteItem key={state.key} className="text-foreground">
              {state.value}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          defaultItems={cities}
          label="Cities"
          placeholder="select city"
          className="text-foreground"
          onSelectionChange={(value: any) =>
            setParams({ ...params, city: value })
          }
        >
          {(state) => (
            <AutocompleteItem key={state.name} className="text-foreground">
              {state.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button color="primary" size="lg" onClick={SearchProperty}>
          Search Properties
        </Button>
      </div>
    </div>
  );
}
