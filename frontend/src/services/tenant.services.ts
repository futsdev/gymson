import type { QueryParamsType } from "@/types/common.types";
import { PrivateApiClient } from "./api.config";

export const GetTenantByNameService = (name: string) => PrivateApiClient.get('/tenants/' + name);