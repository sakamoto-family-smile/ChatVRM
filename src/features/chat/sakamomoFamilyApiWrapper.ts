import { Message } from "../messages/messages";


interface BotResponse {
  status: number;
  message: string;
}


export async function getChatResponse(
    messages: Message[],
    tokenId: string
  ) {
    // tokenIdがnullの場合は例外を発火する
    if (!tokenId) {
      throw new Error("Invalid token");
    }

    // 最新メッセージのみをAPIに送る
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenId}`
    };

    let latestMessage = messages.at(-1)
    const res = await fetch("https://sakamomo-family-app.com/bot", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        message: latestMessage?.content,
      }),
    });

    // TODO : エラーの場合は適切にエラーハンドリングをする
    if (res.status !== 200) {
      throw new Error(`Something went wrong! status code is ${res.status}, text is ${res.text()}`);
    }

    let json_data: BotResponse = await res.json()
    let res_message: string = json_data?.message
    return res_message
  }