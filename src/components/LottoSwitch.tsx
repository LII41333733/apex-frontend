import { useAppDispatch } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiskType } from "@/constants";
import React from "react";

const LottoSwitch: React.FC = () => {
  const dispatch = useAppDispatch();

  const [riskType, setRiskType] = React.useState<string>(
    RiskType.CUSTOM.toUpperCase()
  );

  return (
    <Select
      onValueChange={(e) => setRiskType(e)}
      defaultValue={riskType.toString()}
    >
      <SelectTrigger className="h-8 flex-1 risk-select transparent-ring">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="BASE">Base</SelectItem>
        <SelectItem value="LOTTO">Lotto</SelectItem>
        <SelectItem value="CUSTOM">Custom</SelectItem>
      </SelectContent>
    </Select>
    // <Tabs defaultValue={RiskType.BASE} className="w-[45%] lotto">
    //   <TabsList>
    //     <TabsTrigger
    //       onClick={(e) => {
    //         useDispatch;
    //         dispatch(updateRiskType(RiskType.BASE));
    //       }}
    //       value={RiskType.BASE}
    //     >
    //       {RiskType.BASE}
    //     </TabsTrigger>
    //     <TabsTrigger
    //       onClick={(e) => {
    //         dispatch(updateRiskType(RiskType.LOTTO));
    //       }}
    //       value={RiskType.LOTTO}
    //     >
    //       {RiskType.LOTTO}
    //     </TabsTrigger>
    //   </TabsList>
    // </Tabs>
  );
};

export default LottoSwitch;
