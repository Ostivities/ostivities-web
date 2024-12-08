import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { CREATE_EVENT_COORDINATORS, GET_EVENT_COORDINATOR, GET_ALL_EVENT_COORDINATORS, DELETE_EVENT_COORDINATOR } from "@/app/utils/constants";
import { ICoordinatorCreate } from "@/app/utils/interface";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";


export const useCreateEventCoordinator = () => {
    const createEventCoordinator = useMutation({
        mutationFn: (data: ICoordinatorCreate) => {
            return API_SERVICE._createEventCoordinator(data)
        }, 
        mutationKey: [CREATE_EVENT_COORDINATORS],
        onSuccess: (data: AxiosResponse) => {
            successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
            errorFormatter(error)
        },
    })
    return { createEventCoordinator };
}

export const useGetEventCoordinatorInfo = (coordinatorId: string) => {
    const getEventCoordinatorInfo = useQuery({
        queryKey: [GET_EVENT_COORDINATOR, coordinatorId],
        queryFn: () => {
            return API_SERVICE._getEventCoordinatorInfo(coordinatorId)
        }
    })
    return { getEventCoordinatorInfo }
}

export const useGetAllEventCoordinators = (eventId: string) => {
    const getAllEventCoordinators = useQuery({
        queryKey: [GET_ALL_EVENT_COORDINATORS, eventId],
        queryFn: () => {
            return API_SERVICE._getAllEventCoordinators(eventId)
        }
    })
    return { getAllEventCoordinators }
}

export const useDeleteEventCoordinator = () => {
    const deleteEventCoordinator = useMutation({
        mutationFn: (id: string) => API_SERVICE._deleteEventCoordinators(id),
        onSuccess: (data: AxiosResponse) => {
          successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
          errorFormatter(error);
        },    })
    return { deleteEventCoordinator }
}