function runPlugin() {
  // Fetch conversions
  const chatMessages: any[] = [];
  console.log("Fetching conversations");

  const messages = document.querySelectorAll(".messages-list .message");
  messages.forEach((message) => {
    const sender = message.classList.contains("message--in") ? "other" : "me";
    const content = message.querySelector(".message-bubble__text span")?.textContent?.trim();
    chatMessages.push({ sender, content });
  });

  console.log("Chat messages:", chatMessages);

  // Get ChatGPT replies
  const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
  const openAIEndpoint = import.meta.env.VITE_OPEN_AI_ENDPOINT;

  console.log("Sending conversation to ChatGPT API");
  fetch(openAIEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here is my conversation with a person, please give me 3 options for replying:\n\n${JSON.stringify(
            chatMessages
          )}\n\nReply options:\n1.\n2.\n3.\n`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("ChatGPT API response:", data));
}

export default runPlugin;
