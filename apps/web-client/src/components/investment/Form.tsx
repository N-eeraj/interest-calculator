import {
  useEffect,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";
import { LucideChevronDown } from "lucide-react";

import { SCHEMES } from "@app/definitions/constants/map";
import {
  INVESTMENT_INTERVALS,
  MIN_INVESTMENT_AMOUNT,
  MAX_INVESTMENT_AMOUNT,
} from "@app/definitions/constants/scheme/amounts";
import {
  TENURE_MONTHS_INTERVALS,
  MIN_TENURE_MONTHS,
  MAX_TENURE_MONTHS,
} from "@app/definitions/constants/scheme/tenures";
import type { SchemeType } from "@app/definitions/enums/schemes";

import DsInput from "@components/ds/Input";
import DsRadio from "@components/ds/Radio";
import DsSelect from "@components/ds/Select";
import { Slider } from "@components/ui/slider";
import { Switch } from "@components/ui/switch"

type TenureType = "month" | "year";

interface Props extends HTMLAttributes<HTMLElement> {
  scheme: SchemeType;
  investment: number;
  tenure: number;
  isSeniorCitizen: boolean;
  tenureType: TenureType;
  setScheme: React.Dispatch<React.SetStateAction<SchemeType>>;
  setInvestment:  React.Dispatch<React.SetStateAction<number>>;
  setTenure: React.Dispatch<React.SetStateAction<number>>;
  setIsSeniorCitizen: React.Dispatch<React.SetStateAction<boolean>>;
  setTenureType: React.Dispatch<React.SetStateAction<TenureType>>;
}

export default function InvestmentForm({
  scheme,
  investment,
  tenure,
  isSeniorCitizen,
  tenureType,
  setScheme,
  setInvestment,
  setTenure,
  setIsSeniorCitizen,
  setTenureType,
  className,
}: Props) {
  const schemeOptions = Object.entries(SCHEMES)
    .map(([key, value]) => ({ ...value, value: key }));
    
  const minInvestment = MIN_INVESTMENT_AMOUNT[scheme];
  const maxInvestment = MAX_INVESTMENT_AMOUNT[scheme];

  const tenureStep = TENURE_MONTHS_INTERVALS / (tenureType === "month" ? 1 : 12)
  const minTenure = MIN_TENURE_MONTHS[scheme] / (tenureType === "month" ? 1 : 12);
  const maxTenure = MAX_TENURE_MONTHS[scheme] / (tenureType === "month" ? 1 : 12);

  useEffect(() => {
    setInvestment(Math.min(Math.max(minInvestment, investment), maxInvestment));
    setTenure(Math.min(Math.max(minTenure, tenure), maxTenure));
  }, [
    scheme,
    tenureType,
  ]);

  const handleInvestmentChange = (value: number) => {
    const safeValue = Math.max(Math.min(value, maxInvestment), minInvestment);
    setInvestment(safeValue);
  };
  const handleTenureChange = (value: number) => {
    const safeValue = Math.max(Math.min(value, maxTenure), minTenure);
    setTenure(safeValue);
  };

  return (
    <div className={clsx(
      "space-y-8",
      className
    )}>
      <DsRadio
        value={scheme}
        options={schemeOptions}
        labelKey="name"
        onChange={value => setScheme(value as SchemeType)}
        descriptionRender={((option) => (option as typeof schemeOptions[number]).description)} />

      <div className="flex justify-between items-center gap-y-4 flex-wrap">
        <label>
          Investment Amount
        </label>
        <DsInput
          value={investment}
          type="number"
          inputMode="decimal"
          min={minInvestment}
          max={maxInvestment}
          step={INVESTMENT_INTERVALS}
          className="w-28 text-right"
          onChange={({ target }) => handleInvestmentChange(+target.value)} />
        <Slider
          value={[investment]}
          min={minInvestment}
          max={maxInvestment}
          step={INVESTMENT_INTERVALS}
          className="w-full"
          onValueChange={([value]) => setInvestment(value)} />
      </div>

      <div className="flex justify-between items-center gap-y-4 flex-wrap">
        <div className="flex items-center gap-x-2">
          <label>
            Tenure
          </label>
          <DsSelect
            trigger={(
              <>
                {`${tenureType}s`}
                <LucideChevronDown /> 
              </>
            )}
            options={[
              "month",
              "year",
            ]}
            triggerProps={{
              className: "gap-x-1 h-full pr-1.5! capitalize",
            }}
            optionRender={(option) => <span className="capitalize">{option as string}s</span>}
            onSelect={setTenureType} />
        </div>
        <DsInput
          value={tenure}
          type="number"
          inputMode="decimal"
          step={tenureStep}
          min={minTenure}
          max={maxTenure}
          className="w-28 text-right"
          onChange={({ target }) => handleTenureChange(+target.value)} />
        <Slider
          value={[tenure]}
          step={tenureStep}
          min={minTenure}
          max={maxTenure}
          className="w-full"
          onValueChange={([value]) => setTenure(value)} />
      </div>

      <div className="flex justify-between items-center">
        <label>
          Senior Citizen
        </label>
        <Switch
          checked={isSeniorCitizen}
          className="data-[state=unchecked]:bg-primary/30!"
          onCheckedChange={setIsSeniorCitizen} />
      </div>
    </div>
  );
}
