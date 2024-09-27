import { useAppDispatch } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionType, RiskType } from "@/constants";
import { updateRiskType } from "@/state/optionsChainSlice";
import { useDispatch } from "react-redux";

const LottoSwitch: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Tabs defaultValue={RiskType.BASE} className="w-[45%] lotto">
      <TabsList>
        <TabsTrigger
          onClick={(e) => {
            useDispatch;
            dispatch(updateRiskType(RiskType.BASE));
          }}
          value={RiskType.BASE}
        >
          {RiskType.BASE}
        </TabsTrigger>
        <TabsTrigger
          onClick={(e) => {
            dispatch(updateRiskType(RiskType.LOTTO));
          }}
          value={RiskType.LOTTO}
        >
          {RiskType.LOTTO}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default LottoSwitch;
