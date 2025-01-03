import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { updateRiskType } from '@/state/optionsChainSlice';

const LottoSwitch: React.FC = () => {
    const dispatch = useAppDispatch();
    const riskType = useAppSelector((state) => state.optionsChain.riskType);

    return (
        <Select
            onValueChange={(e) => {
                dispatch(updateRiskType(e));
            }}
            defaultValue={riskType}
        >
            <SelectTrigger className="h-8 flex-1 mr-4 risk-select bg-background transparent-ring text-foreground">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Base">Base</SelectItem>
                <SelectItem value="Lotto">Lotto</SelectItem>
                <SelectItem value="Hero">Hero</SelectItem>
                <SelectItem value="Vision">Vision</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default LottoSwitch;
