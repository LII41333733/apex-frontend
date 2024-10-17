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
  const [riskType, setRiskType] = React.useState<string>(
    RiskType.CUSTOM.toUpperCase()
  );

  return (
    <Select
      onValueChange={(e) => setRiskType(e)}
      defaultValue={riskType.toString()}
    >
      <SelectTrigger className="h-8 flex-1 mr-4 risk-select bg-background transparent-ring text-foreground">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="BASE">Base</SelectItem>
        <SelectItem value="LOTTO">Lotto</SelectItem>
        <SelectItem value="CUSTOM">Custom</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LottoSwitch;
