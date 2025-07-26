"use server";

import { GET_LOGS } from "@/constants/endpoints";
import { fetchData } from "@/utils/fetch";

export async function fetchLogsAction() {
  try {
    const res = await fetchData(GET_LOGS, "GET", 0);
    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
