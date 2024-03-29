import { Organization } from "@/store/types/Organization";

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id);
  const data = await res.json();
  return data.data;
};


export default async function Head({ params }: { params: { id: string } })  {
  const org: Organization = await getOrg(params.id);

  return (
    <>
      <title>{org?.attributes?.name + ' - ERRENTA.EUS'}</title>
    </>
  )
}
