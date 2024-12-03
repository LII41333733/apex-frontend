import { toast } from '@/components/ui/use-toast';

export default function (title?: string, description?: string) {
    toast({
        title: title || 'Stop Loss Modified',
        description:
            description ||
            'Stop Loss updated to 0.23 from 0.14 for SPY 600C 12/6.',
    });
}
