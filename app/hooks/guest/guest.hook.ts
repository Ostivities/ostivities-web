import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { CREATE_GUEST, GET_EVENT_GUESTS, GET_TICKET_GUESTS } from "@/app/utils/constants";
import { IGuestCreate, IGuestData } from "@/app/utils/interface";
import { AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";


export const useRegisterGuest = () => {
    const registerGuest = useMutation({
        mutationFn: (data: IGuestCreate) => {
        return API_SERVICE._registerGuest(data);
        },
        mutationKey: [CREATE_GUEST],
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        },
    });
    return { registerGuest };
}

export const useGetEventGuests = (eventId: string, page:number, limit:number) => {
    const getEventGuests = useQuery({
        queryKey: [GET_EVENT_GUESTS, eventId, page, limit],
        queryFn: () => {
        return API_SERVICE._getEventGuests(eventId, page, limit);
        },
    });
    return { getEventGuests };
}

export const useGetTicketGuests = (id: string) => {
    const getTicketGuests = useQuery({
        queryKey: [GET_TICKET_GUESTS, id],
        queryFn: () => {
        return API_SERVICE._getTicketGuestd(id);
        },
    });
    return { getTicketGuests };
}