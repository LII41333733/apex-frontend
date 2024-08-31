import { useAppDispatch } from "@/state/hooks";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Displays } from "@/constants";
import { updateDisplay } from "@/state/mainSlice";

const DisplaySelector: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Tabs
      defaultValue={Displays.POSITIONS}
      className="w-[100%] display-tab mt-3 mb-3"
    >
      <TabsList className="w-[100%] flex justify-between">
        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.POSITIONS));
          }}
          value={Displays.POSITIONS}
        >
          {Displays.POSITIONS}
        </TabsTrigger>

        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.CHAIN));
          }}
          value={Displays.CHAIN}
        >
          {Displays.CHAIN}
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            dispatch(updateDisplay(Displays.TRADES));
          }}
          value={Displays.TRADES}
        >
          {Displays.TRADES}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DisplaySelector;
