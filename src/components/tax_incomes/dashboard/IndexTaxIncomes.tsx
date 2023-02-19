"use client";

import { useGetTaxIncomesQuery } from "@/store/endpoints/taxIncomes";
import { TaxIncomeCard } from "../Card";
import { SearchBar } from "@/components/filters";
import { useState } from "react";
import { TextFilter } from "@/components/filters/TextFilter";
import { SideNav } from "./SideNav";

const IndexTaxIncomes = () => {

  const [ search, setSearch ] = useState({});
  const { data } = useGetTaxIncomesQuery({});

  return (
    <>
        <div className="rounded-md bg-white transition-all dark:bg-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5">
            <SideNav />
            <div className="col-span-3 md:border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4 p-3">
              <SearchBar searchParams={search} setSearchParams={setSearch} >
                <TextFilter key="name" key_name="abogado" title="abogado" />
              </SearchBar>
              <div className="space-y-3 mt-3">
              {data && data.map((tax) => (
                <TaxIncomeCard key={tax.id} tax={tax} />
              ))}
              </div>
          </div>
          </div>
        </div>

    </>
  );
};

export { IndexTaxIncomes }