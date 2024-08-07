import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CallPutSwitchProps {
  setOptionType: (optionType: string) => void;
}

const CallPutSwitch: React.FC<CallPutSwitchProps> = ({ setOptionType }) => (
  <Tabs defaultValue="Call" className="w-[40%]">
    <TabsList>
      <TabsTrigger
        onClick={(e) => {
          setOptionType((e.target as HTMLElement).innerText);
        }}
        value="Call"
      >
        Call
      </TabsTrigger>
      <TabsTrigger
        onClick={(e) => {
          setOptionType((e.target as HTMLElement).innerText);
        }}
        value="Put"
      >
        Put
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export default CallPutSwitch;
