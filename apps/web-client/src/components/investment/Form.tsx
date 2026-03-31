import {
  useEffect,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";

import { SCHEMES } from "@app/definitions/constants/map";
import {
  MIN_INVESTMENT_AMOUNT,
  MAX_INVESTMENT_AMOUNT,
} from "@app/definitions/constants/scheme/amounts";
import {
  MIN_TENURE_MONTHS,
  MAX_TENURE_MONTHS,
} from "@app/definitions/constants/scheme/tenures";
import type { SchemeType } from "@app/definitions/enums/schemes";

import { Slider } from "@components/ui/slider";
import { Switch } from "@components/ui/switch"
import DsInput from "@components/ds/Input";
import DsRadio from "@components/ds/Radio";

interface Props extends HTMLAttributes<HTMLElement> {
  scheme: SchemeType;
  investment: number;
  tenure: number;
  isSeniorCitizen: boolean;
  setScheme: React.Dispatch<React.SetStateAction<SchemeType>>;
  setInvestment:  React.Dispatch<React.SetStateAction<number>>;
  setTenure: React.Dispatch<React.SetStateAction<number>>;
  setIsSeniorCitizen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InvestmentForm({
  scheme,
  investment,
  tenure,
  isSeniorCitizen,
  setScheme,
  setInvestment,
  setTenure,
  setIsSeniorCitizen,
  className,
}: Props) {
  const schemeOptions = Object.entries(SCHEMES)
    .map(([key, value]) => ({ ...value, value: key }));
    
  const minInvestment = MIN_INVESTMENT_AMOUNT[scheme];
  const maxInvestment = MAX_INVESTMENT_AMOUNT[scheme];

  const minTenure = MIN_TENURE_MONTHS[scheme];
  const maxTenure = MAX_TENURE_MONTHS[scheme];

  useEffect(() => {
    setInvestment(Math.min(Math.max(minInvestment, investment), maxInvestment));
    setTenure(Math.min(Math.max(minTenure, tenure), maxTenure));
  }, [
    scheme,
  ]);

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
          className="w-28 text-right"
          onChange={({ target }) => setInvestment(+target.value)} />
        <Slider
          value={[investment]}
          min={minInvestment}
          max={maxInvestment}
          className="w-full"
          onValueChange={([value]) => setInvestment(value)} />
      </div>

      <div className="flex justify-between items-center gap-y-4 flex-wrap">
        <label>
          Tenure
        </label>
        <DsInput
          value={tenure}
          type="number"
          inputMode="decimal"
          min={minTenure}
          max={maxTenure}
          className="w-28 text-right"
          onChange={({ target }) => setTenure(+target.value)} />
        <Slider
          value={[tenure]}
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
