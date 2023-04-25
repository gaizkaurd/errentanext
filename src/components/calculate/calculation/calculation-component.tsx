import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalizedMoment } from "@/lib/utils";
import { CalculationManage } from "@/store/types/Calculator";
import { BanknotesIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CalculationEditButton } from "./actions";

export const CalculationManageComponent = ({ calculation, org_id }: { calculation: CalculationManage, org_id: string }) => {

  const s = useLocalizedMoment();

  return (
    <div className="divide-y-slate-200 mt-4 mb-4 divide-y rounded border border-slate-200 dark:border-midnight-700">
      <div className="flex flex-col divide-y transition-all ease-in hover:bg-slate-50 dark:hover:bg-midnight-800">
        <div className="border-l-2 border-transparent my-1 mx-1 px-3">
          <div className="flex flex-col md:flex-row md:justify-between py-3">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-4">
                <p className="text-sm line-clamp-3">
                  {calculation.attributes.output.classification} - {calculation.id}
                </p>
                <CalculationEditButton calculation={calculation} org_id={org_id} />
                <Button variant="destructive" className="w-5 h-5 rounded-full p-0">
                  <XCircleIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
                  <div className="flex items-center text-slate-400 min-w-0">
                    <p className="flex items-center" title="Git ref">
                      <BanknotesIcon className="h-4 w-4 flex-shrink-0 stroke-slate-400" />
                      <span className="text-xs text-slate-500 ml-2" title="Git ref">
                        {calculation.attributes.price_result} €
                      </span>
                    </p>
                  </div>
                  {!calculation.attributes.train_with && (
                    <div className="flex items-center min-w-0">
                      <p className="flex items-center" title="Git ref">
                        {calculation.attributes.stale_calculation ? (
                          <Badge variant="outline" className="dark:text-white">
                            Stale v{calculation.attributes.calculator_version}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            LATEST
                          </Badge>
                        )}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center text-slate-400 min-w-0">
                    <p className="flex items-center" title="Git ref">
                      {calculation.attributes.train_with ? (
                        <>
                          <span className="text-xs text-green-500 font-bold ml-2" title="Git ref">
                            Train data
                          </span>
                          {!calculation.attributes.eligible_for_training && (
                            <Badge variant="destructive" className="ml-3">
                              INVALID
                            </Badge>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-slate-500 ml-2" title="Git ref">
                          No train data
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-8 flex flex-col justify-center gap-2 flex-shrink-0 mt-2 md:mt-0">
              <div className="flex items-center text-slate-400 min-w-0">
                <p className="flex items-center" title="Summarized at 2023-04-17 10:05:18 UTC">
                  <svg className="icon h-4 w-4 flex-shrink-0 stroke-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span className="text-xs text-slate-500 ml-2">
                    {s(calculation.attributes.predicted_at).fromNow()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}