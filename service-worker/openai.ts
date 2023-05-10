const systemPrompt = `You are an expert on Human Resources with a background in Software Development.
You are given the task to classify the profile of a candidate over the following technologies:

React, NodeJS, Typescript, Javascript

using a rating from 0 to 10.

Output:
- You can only reply in the following JSON format: 

{
    \"name\": string,
    \"role\": string,
    \"technologies\": [
        {
            \"name\": string,
            \"rating\": number
        }
    ]
}

IMPORTANT: 
- In case there isn't any information about a given technology, you should put 0.
- Do not explain any of your reasoning, just classify the profile.
- Do not add any text outside of the JSON`;

export function getOpenAIClassification(
  profile: string,
  technologies: string[],
  apikey: string
) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apikey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt.replace(
            "{TECHNOLOGIES}",
            technologies.join(", ")
          ),
        },
        { role: "user", content: profile },
      ],
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => resp.choices[0]?.message?.content);
}
