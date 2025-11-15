import type { QueryParamsType } from "@/types/common.types";
import { PrivateApiClient } from "./api.config";

export const GetSubscriptionListService = (queryParams: QueryParamsType) => PrivateApiClient.get('/subscriptions', { params: queryParams });