"use client";
import { useContext } from "react";
import Select, { MultiValue } from "react-select";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Key } from "./select-filter";
import { Button } from "../ui/button";

export const MultipleSelectFilter = (props: {
  title: string;
  key_name: string;
  keys: Key[];
}) => {
  const { searchParams } = useContext(SearchContext);

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams}>
      <SelectConfiguration {...props} />
    </BaseTooltip>
  );
};

export const SelectConfiguration = (props: {
  title: string;
  key_name: string;
  keys: Key[];
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const updateSearchValue = (value: MultiValue<Key>) => {
    if (value == null) {
      clear();
      return;
    }
    setSearchParams({
      ...searchParams,
      [props.key_name]: value.map((d) => d.value),
    });
  };

  const clear = () => {
    setSearchParams((current: any) => {
      const cp = { ...current };
      delete cp[props.key_name];
      return cp;
    });
  };

  return (
    <TooltipContentBase title={props.title}>
      <div>
        <Select
          isMulti
          defaultValue={
            typeof searchParams[props.key_name] === "string" ? (
               {
                label: props.keys.find((k) => k.value === searchParams[props.key_name])?.label,
                value: searchParams[props.key_name],
              }
             ) : (
              searchParams[props.key_name]?.map((d: any) => ({
                label: props.keys.find((k) => k.value === d)?.label,
                value: d,
              }))
            )
          }
          onChange={updateSearchValue}
          options={props.keys}
        ></Select>
        {props.key_name in searchParams && (
          <Button onClick={clear} size="sm" color="error">
            Deshabilitar
          </Button>
        )}
      </div>
    </TooltipContentBase>
  );
};
