import { OrganizationListMap } from "../lists/org-list-explore"
import { OrganizationExplore } from "./org-explore-filters"
import { Organization } from "@/store/types/Organization"

export const OrgListExploreMap = (props: { orgs: Organization[], selected?: string }) => {

  return (
    <>
      <div className='p-3'>
        <p className='text-xl font-bold my-3'>Más de 50 asesorías</p>
        <OrganizationExplore />
      </div>
      <OrganizationListMap orgs={props.orgs} selected={props.selected} />
    </>
  )
}