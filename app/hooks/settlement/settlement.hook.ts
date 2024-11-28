import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { 
    CREATE_SETTLEMENT_ACCOUNT, 
    UPDATE_SETTLEMENT_ACCOUNT, 
    GET_SETTLEMENT_ACCOUNT, 
    GET_ALL_BANKS, 
    VERIFY_BANK_ACCOUNT 
} from "@/app/utils/constants";
import { ISettlementData, IVerifyBankAccount } from "@/app/utils/interface";
import { AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";


export const useCreateSettlementAccount = () => {
    const createSettlementAccount = useMutation({
        mutationFn: (data: ISettlementData) => {
            return API_SERVICE._createSettlementAccount(data);
        },
        mutationKey: [CREATE_SETTLEMENT_ACCOUNT],
        onSuccess: (data: AxiosResponse) => {
            successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
            errorFormatter(error);
        },
    });
    return { createSettlementAccount };
}

export const useUpdateSettlementAccount = () => {
    const updateSettlementAccount = useMutation({
        mutationFn: (data: ISettlementData) => {
            return API_SERVICE._updateSettlementAccount(data);
        },
        mutationKey: [UPDATE_SETTLEMENT_ACCOUNT],
        onSuccess: (data: AxiosResponse) => {
            successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
            errorFormatter(error);
        },
    });
    return { updateSettlementAccount };
}

export const useGetSettlementAccount = (id: string) => {
    const getSettlementAccount = useQuery({
        queryKey: [GET_SETTLEMENT_ACCOUNT, id],
        queryFn: () => {
            return API_SERVICE._getSettlementAccount(id);
        },
    });
    return { getSettlementAccount };
}

export const useGetAllBanks = () => {
    const getAllBanks = useQuery({
        queryKey: [GET_ALL_BANKS],
        queryFn: () => {
            return API_SERVICE._getAllBanks();
        },
    });
    return { getAllBanks };
}

export const useVerifyBankAccount = () => {
    const verifyBankAccount = useMutation({
        mutationFn: (data: IVerifyBankAccount) => {
            return API_SERVICE._verifyAccountNumber(data);
        },
        mutationKey: [CREATE_SETTLEMENT_ACCOUNT],
        onSuccess: (data: AxiosResponse) => {
            successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
            errorFormatter(error);
        },
    });
    return { verifyBankAccount };
}