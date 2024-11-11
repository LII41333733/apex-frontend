import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OptionType } from '@/constants';
import { updateOptionType } from '@/state/optionsChainSlice';
import { useDispatch } from 'react-redux';

const CallPutSwitch: React.FC = () => {
    const dispatch = useAppDispatch();
    const optionType = useAppSelector((state) => state.optionsChain.optionType);

    return (
        <Tabs defaultValue={optionType} className='w-[25%] call-put mr-1'>
            <TabsList className='card'>
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
