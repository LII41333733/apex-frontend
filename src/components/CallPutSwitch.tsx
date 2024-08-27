import { useAppDispatch } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionType } from "@/constants";
import { updateOptionType } from "@/state/optionsChainSlice";
import { useDispatch } from "react-redux";

const CallPutSwitch: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Tabs defaultValue={OptionType.CALL} className="w-[40%]">
      <TabsList>
        <TabsTrigger
          onClick={(e) => {
            useDispatch;
            dispatch(updateOptionType(OptionType.CALL));
          }}
          value={OptionType.CALL}
        >
          {OptionType.CALL}
        </TabsTrigger>
        <TabsTrigger
          onClick={(e) => {
            dispatch(updateOptionType(OptionType.PUT));
          }}
          value={OptionType.PUT}
        >
          {OptionType.PUT}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CallPutSwitch;
