// generateJobDescription.js
import { apiKey, apiUrl } from "./config.js";

// Function to generate a job description using Gemini
export async function generateJobDescription(title, companyName, industries, location, experienceLevel, employmentType) {
    // Create a prompt for Gemini
    const prompt = `
        Write a professional and realistic job description for a ${title} role.
        The industries are: ${industries.join(", ")}.
        The company name is: ${companyName}.
        The location is: ${location}.
        The experience level is: ${experienceLevel}.
        The employment type is: ${employmentType}.
        Do not provide additional advice or explanations.
    `;

    // Make a request to the Gemini API
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            model: "gemini-1.5-flash" // Specify the model
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.text; // Assuming the API returns the generated text in a text field
}