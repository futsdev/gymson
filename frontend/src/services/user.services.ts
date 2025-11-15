import type { QueryParamsType } from "@/types/common.types";
import { PrivateApiClient } from "./api.config";

export const GetUserListService = (queryParams: QueryParamsType) => PrivateApiClient.get('/users', { params: queryParams });