"use client";
import { OrganizationEditForm } from "@/components/organizations";
import { useGetOrganizationManageByIdQuery } from "@/store/endpoints/organizations";


export default function Page({ params }: { params: { id: string } }) {

  const { data } = useGetOrganizationManageByIdQuery(params.id);

  return (
    <div className="w-full">
      {data && (
        <>
          <OrganizationEditForm organization={data} />
        </>
      )}
    </div>
  );
}