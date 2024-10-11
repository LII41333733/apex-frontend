import React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardContent } from "../ui/card";

export const description = "A donut chart with text";
import data from "../../data/mockVisionData.json";
import visionColors from "../../constants/visionColors";
import { dollar } from "@/utils/dollar";
import PositionCard from "../PositionCard";

// console.log(data);

export const ONE_MILLION = 1_000_000;

const chartData: any = data
  .filter((e) => e.pl > 0)
  .slice(0, 35)
  .map(
    (
      {
        pl,
        optionSymbol,
        postTradeBalance,
        quantity,
        fillPrice,
        lastPrice,
        tradeAmount,
        maxPrice,
      },
      i
    ) => ({
      pl,
      optionSymbol,
      fill: visionColors[i],
      postTradeBalance,
      quantity,
      fillPrice,
      lastPrice: Math.random() * (maxPrice - fillPrice / 2) + fillPrice / 2,
      tradeAmount,
      maxPrice,
      stopPrice: fillPrice / 2,
      trim1Price: fillPrice * 1.3,
      trim2Price: fillPrice * 1.7,
    })
  );

const chartConfig = chartData.reduce(
  (p: any, { pl, optionSymbol, fill }: any) => ({
    ...p,
    [optionSymbol]: {
      label: pl,
      color: fill,
    },
  }),
  {}
);

const total = chartData.reduce((p: any, c: any) => p + c.pl, 0);

const lastData = chartData[chartData.length - 1];
const diff = ONE_MILLION - total;

chartData.push({
  pl: diff,
  optionSymbol: "Target",
  fill: "gray",
});

const VisionChart: React.FC = () => {
  const hovref = React.useRef(null);

  React.useEffect(() => {
    if (hovref.current) {
      console.log(hovref.current);
    }
  }, [hovref]);

  const space = 35;
  const mod1 = -50;
  const mod2 = mod1 + space;
  const mod3 = 40;
  const mod4 = mod3 + space;

  const [activeSlice, setActiveSlice] = React.useState(null);

  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="mx-auto chart-container">
        {activeSlice && <PositionCard trade={activeSlice} />}
        <PieChart className="m-o p-0">
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="pl"
            nameKey="optionSymbol"
            innerRadius={135}
            onMouseOver={(e) => {
              console.log(e);

              e.name === "Target" ? setActiveSlice(null) : setActiveSlice(e);
            }}
            onMouseOut={() => setActiveSlice(null)}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  if (!activeSlice) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + mod1}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {dollar(total)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + mod2}
                          className="fill-muted-foreground text-lg"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + mod3}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {dollar(diff)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + mod4}
                          className="fill-muted-foreground text-lg"
                        >
                          To Go
                        </tspan>
                      </text>
                    );
                  }
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
};

export default VisionChart;
