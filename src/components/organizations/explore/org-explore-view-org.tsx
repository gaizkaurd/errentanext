"use client";
import { Separator } from "@/components/ui/separator";
import { Organization, Review } from "@/store/types/Organization";
import Link from "next/link";
import { ReviewComponentInline, ReviewsSummary } from "@/components/reviews";
import { useKeepSearchParams } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { OrganizationReviews } from "../org-review";

export const OrgViewExplore = (props: { org: Organization, reviews: Review[] }) => {

  const s = useKeepSearchParams();
  const { org, reviews } = props;

  return (
    <div className="p-3 grid grid-cols-1 gap-4">
      <div className="flex">
        <div className="flex-1">
          <p className="text-2xl font-bold leading-tight tracking-tighter">
            {org.attributes.name}
          </p>
          <p className="text-xl font-bold leading-tight tracking-tighter">
            Asesoría en <span className="font-light">{org.attributes.city}</span>.
          </p>
        </div>
        <div>
          <Link href={`/organizations/map?${s({org: undefined})}`}>
            <XMarkIcon className="h-6" />
            <span className="sr-only">Cerrar</span>
          </Link>
        </div>
      </div>
      <Separator />
      <section>
        <p className="text-xl font-bold leading-tight tracking-tighter">
          Novedades
        </p>
      </section>
      <Separator />
      <section>
        <p className="text-xl font-bold leading-tight tracking-tighter">
          Reseñas
        </p>
        <ReviewsSummary org={org} />
        {reviews.map((i, index) => {
          return (
            <ReviewComponentInline review={i} key={index} />
          )
        })}
        <OrganizationReviews reviews={reviews} org={org} />
      </section>
    </div>
  );
}