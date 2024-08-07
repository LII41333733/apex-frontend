import { ApiResponse } from "@/interfaces/ApiResponse";

export default <T>(res: ApiResponse<T>) => res.statusCode === 200;
