import { BOARD_UID_PATH } from "src/layout/MainLayout";

export const getBoardUrl = (baseUrl: string, boardUid: string) =>
  `${
    baseUrl.startsWith("https://") ? "" : "https://"
  }${baseUrl}${BOARD_UID_PATH}${boardUid}`;
