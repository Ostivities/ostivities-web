import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { INITIALISE_PAYMENT, VERIFY_PAYMENT } from "@/app/utils/constants";
import { IPaymentInitialise } from "@/app/utils/interface";
import { AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";


export const useInitialisePayment = () => {
    const initialisePayment = useMutation({
        mutationFn: (data: IPaymentInitialise) => {
        return API_SERVICE._initialisePayment(data);
        },
        mutationKey: [INITIALISE_PAYMENT],
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        },
    });
    return { initialisePayment };
}

export const useVerifyPayment = (reference: string) => {
    const verifyPayment = useQuery({
        queryKey: [VERIFY_PAYMENT, reference],
        queryFn: () => {
            return API_SERVICE._verifyPayment(reference)
        },
    });
    return { verifyPayment }
}