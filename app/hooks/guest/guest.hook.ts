import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { CREATE_GUEST, GET_EVENT_GUESTS, GET_EVENT_GUESTS_BY_UNIQUE_KEY, GET_TICKET_GUESTS, GET_GUEST_INFO } from "@/app/utils/constants";
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

export const useGetGuestInfo = (event_unique_key: string, guest_id: string, ticket_id: string) => {
    const getGuestInfo = useQuery({
        queryKey: [GET_GUEST_INFO, event_unique_key, guest_id, ticket_id],
        queryFn: () => {
            return API_SERVICE._getGuestInfo(event_unique_key, guest_id, ticket_id)
        },
    });
    return { getGuestInfo }
}

export const useGetEventGuests = (eventId: string, page:number, limit:number, search?: string) => {
    const getEventGuests = useQuery({
        queryKey: [GET_EVENT_GUESTS, eventId, page, limit, search],
        enabled: !!eventId,
        queryFn: () => {
        return API_SERVICE._getEventGuests(eventId, page, limit, search);
        },
    });
    return { getEventGuests };
}

export const useGetEventGuestsByUniqueKey = (event_unique_key: string, page:number, limit:number, search?: string) => {
    const getEventGuestsByUniqueKey = useQuery({
        queryKey: [GET_EVENT_GUESTS_BY_UNIQUE_KEY, event_unique_key, page, limit, search],
        enabled: !!event_unique_key,
        queryFn: () => {
        return API_SERVICE._getEventGuestsByUniqueKey(event_unique_key, page, limit, search);
        },
    });
    return { getEventGuestsByUniqueKey };
}


export const useGetTicketGuests = (ticket_id: string) => {
    const getTicketGuests = useQuery({
        queryKey: [GET_TICKET_GUESTS, ticket_id],
        enabled: !!ticket_id,
        queryFn: () => {
        return API_SERVICE._getTicketGuestId(ticket_id);
        },
    });
    return { getTicketGuests };
}