import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SchemeType } from "@app/definitions/enums/schemes";
import InvestmentForm from "@/components/investment/Form";

export const Route = createFileRoute("/(auth)/investments/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [scheme, setScheme] = useState(SchemeType.FD);
  const [investment, setInvestment] = useState(0);
  const [tenure, setTenure] = useState(0);

  return (
    <section>
      <InvestmentForm
        scheme={scheme}
        investment={investment}
        tenure={tenure}
        setScheme={setScheme}
        setInvestment={setInvestment}
        setTenure={setTenure}
        className="max-w-md" />
    </section>
  );
}
