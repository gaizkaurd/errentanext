"use client";
// import { cn, useLocalizedMoment } from "@/lib/utils";
// import { useGetOrganizationByIdQuery } from "@/store/endpoints/organizations";
// import { cva } from "class-variance-authority";
// import { motion } from "framer-motion";

// const bannerVariants = cva(
//   "top-20 h-16 z-50 w-full grid grid-cols-1",
//   {
//     variants: {
//       variant: {
//         open:
//           "bg-green-600",
//         near_close:
//           "bg-yellow-600",
//         closed:
//           "bg-red-600",
//       },
//     },
//     defaultVariants: {
//       variant: "open",
//     },
//   }
// )

// export const OrganizationOpen = (props: { org_id: string }) => {
//   const { currentData } = useGetOrganizationByIdQuery(props.org_id);
//   const s = useLocalizedMoment();

//   // if (props.org.attributes.open) {
//   //   if (props.org.attributes.near_close) {
//   //     return <>Cierra en menos de 30 minutos.</>
//   //   } else {
//   //     return <>Abierto ahora.</>
//   //   }
//   // } else {
//   //   return <>Abre {s(props.org.attributes.nearest_open_time).calendar()}.</>
//   // }

//   return currentData ? (
//     <motion.div 
//     initial={{ y: -100 }}
//     animate={{ y: 0 }}
//     className={cn(bannerVariants({ 
//       variant: currentData.attributes.open ? currentData.attributes.near_close ? "near_close" : "open" : "closed",
//      }))}>
//       <p className="text-white text-center font-bold text-xl my-auto">
//      {currentData.attributes.open ? currentData.attributes.near_close ? "Cierra en menos de 30 minutos." : "Abierto ahora." : `Abre ${s(currentData.attributes.nearest_open_time).calendar()}.`}
//       </p>
//     </motion.div>
//   ) : <></>

// }

import { useState } from 'react';
import classNames from 'classnames';
import { cva } from 'class-variance-authority';
import { cn, useLocalizedMoment } from '@/lib/utils';
import { ArrowRightOnRectangleIcon, ArrowUpRightIcon, ChatBubbleBottomCenterIcon, GlobeAltIcon, MapPinIcon, PhoneArrowDownLeftIcon, PhoneArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Organization } from '@/store/types/Organization';
import { GeneralCard, GeneralCardContent, GeneralCardHeading } from '../ui/card';

export const OrganizationOpen = (props: { org: Organization }) => {
  const [showHours, setShowHours] = useState(false);
  const s = useLocalizedMoment();
  const { org } = props;

  const cardCn = "h-56 flex-shrink-0";


  return (
    <>
      <GeneralCard variant={org.attributes.near_close ? "near_close" : org.attributes.open ? "open" : "close"} className={cardCn}>
        {org.attributes.open ? (org.attributes.near_close ? <p className="text-white text-xl font-bold mb-1">Cierra en menos de 30 minutos.</p> : <p className="text-white text-xl font-bold mb-1">Abierto ahora.</p>) 
          : (<p className="text-white text-xl font-bold mb-1">Abre {s(org.attributes.nearest_open_time).fromNow()}.</p>)}
          <OpenCloseHours org={org} />
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <ChatBubbleBottomCenterIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Valoraciones</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            Google
          </p>
          <p className="text-md font-bold">
            {org.attributes.google_place_details?.rating} <span className="text-sm font-light">/ 5</span>
          </p>
          <p className="text-sm">
            ERRENTA.EUS
          </p>
          <p className="text-md font-bold">
            {org.attributes.ratings.average} <span className="text-sm font-light">/ 5</span>
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <PhoneArrowUpRightIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Teléfono</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            {org.attributes.phone}
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <MapPinIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Dirección</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            {org.attributes.street}, {org.attributes.city}, <br /> {org.attributes.province}
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <ArrowUpRightIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Página web</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <a className="text-sm text-blue-500 underline" href={org.attributes.website}>
            {org.attributes.website}
          </a>
        </GeneralCardContent>
      </GeneralCard>
    </>
  );
};

const OpenCloseHours = (props: { org: Organization }) => {
  const { org } = props;
  const s = useLocalizedMoment();

  const getName = (day: string) => {
    switch (day) {
      case "monday":
        return "Lunes";
      case "tuesday":
        return "Martes";
      case "wednesday":
        return "Miércoles";
      case "thursday":
        return "Jueves";
      case "friday":
        return "Viernes";
      case "saturday":
        return "Sábado";
      case "sunday":
        return "Domingo";
    }
  };

  const names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

  return (
    <>
      {names.map((day, i) => (
        <p className="text-white text-sm" key={i}>{getName(day)}: {" "}
        {org.attributes.open_close_hours[day] && org.attributes.open_close_hours[day]?.open !== 'closed' ?
        <>
        {
          s.utc(org.attributes.open_close_hours[day].open, "HH:mm").local().format("HH:mm")
        } - {s.utc(org.attributes.open_close_hours[day].close, "HH:mm").local().format("HH:mm")}
        </> : "Cerrado"}
        
        </p>
      ))}
    </>
  );
};