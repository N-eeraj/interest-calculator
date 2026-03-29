import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SchemeType } from "@app/definitions/enums/schemes";
import { SCHEMES } from "@app/definitions/constants/map";
import {
  MIN_INVESTMENT_AMOUNT,
  MAX_INVESTMENT_AMOUNT,
} from "@app/definitions/constants/scheme/amounts";
import {
  MIN_TENURE_MONTHS,
  MAX_TENURE_MONTHS,
} from "@app/definitions/constants/scheme/tenures";

import { Slider } from "@components/ui/slider";
import DsInput from "@components/ds/Input";
import DsRadio from "@components/ds/Radio";

export const Route = createFileRoute("/(auth)/investments/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(0);
  const [tenure, setTenure] = useState(0);

  const schemeOptions = Object.entries(SCHEMES)
    .map(([key, value]) => ({ ...value, value: key }));

  const minInvestment = MIN_INVESTMENT_AMOUNT[scheme];
  const maxInvestment = MAX_INVESTMENT_AMOUNT[scheme];

  const minTenure = MIN_TENURE_MONTHS[scheme];
  const maxTenure = MAX_TENURE_MONTHS[scheme];

  return (
    <section>
      <div className="max-w-md space-y-8">
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
      </div>
    </section>
  );
}
