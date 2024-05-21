export const prerender = false;

import type { APIRoute } from "astro";

/* ---------------------------------- DATA ---------------------------------- */
const LISTIDS = [3];
const UPDATEENABLED = true;

/* -------------------------------- ENDPOINT -------------------------------- */

export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("content-type") === "application/json") {
        const body = await request.json();
        const email = body.email;

        const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
        // Production uses SSR, so process.env.BREVO_API_KEY should be used there
        const BREVO_API_KEY =
            import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY;

        if (!BREVO_API_KEY) {
            console.error("No BREVO_API_KEY defined");
            return new Response(null, { status: 400 });
        }

        const payload = {
            updateEnabled: UPDATEENABLED,
            email: email,
            listIds: LISTIDS
        };

        try {
            const response = await fetch(BREVO_API_URL, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "api-key": BREVO_API_KEY,
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Request was successful
                console.log("Contact added successfully");
                return new Response(
                    JSON.stringify({
                        message: "Contact added successfully"
                    }),
                    {
                        status: 200
                    }
                );
            } else {
                // Request failed
                console.error("Failed to add contact");
                return new Response(null, { status: 400 });
            }
        } catch (error) {
            console.error("An error occurred while adding contact:", error);
            return new Response(null, { status: 400 });
        }
    }
    return new Response(null, { status: 400 });
};
