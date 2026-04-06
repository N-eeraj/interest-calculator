import {
  Pie,
  PieChart,
} from "recharts";
import clsx from "clsx";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@components/ui/chart"

const chartConfig = {
  amount: {
    label: "Amounts",
  },
  invested: {
    label: "Invested",
  },
  returns: {
    label: "Returns",
  },
} satisfies ChartConfig

interface Props {
  invested: number;
  returns: number;
  className?: string;
}

export default function InvestmentChart({
  invested,
  returns,
  className = "w-sm"
}: Props) {
  const chartData = [
    {
      name: "invested",
      value: invested,
      fill: "var(--color-primary)",
    },
    {
      name: "returns",
      value: returns,
      fill: "var(--color-secondary)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className={clsx(
        "aspect-square mx-auto",
        className,
      )}>
      <PieChart>
        <ChartLegend
          content={<ChartLegendContent />}
          verticalAlign="top" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey="value"
          innerRadius={"55%"}
          startAngle={90}
          endAngle={-270} />
      </PieChart>
    </ChartContainer>
  );
}
