import type { QueryParamsType } from "@/types/common.types";
import { PrivateApiClient } from "./api.config";

export const GetSubscriptionListService = (queryParams: QueryParamsType) => PrivateApiClient.get('/subscriptions', { params: queryParams });

export const CreateSubscriptionService = (payload: QueryParamsType) => PrivateApiClient.post('/subscriptions', payload);