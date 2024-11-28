import { SEND_BULK_EMAIL } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { IBulkMailData } from "@/app/utils/interface";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";


export const useSendBulkEmail = () => {
    const sendBulkEmail = useMutation({
        mutationFn: (data: IBulkMailData) => {
        return API_SERVICE._sendBulkEmail(data);
        },
        mutationKey: [SEND_BULK_EMAIL],
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        },
    });
    return { sendBulkEmail };
}