import { NextRequest, NextResponse } from "next/server";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";


/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
    const body: any = await req.json();

    try {
        const ReactDOMServer = (await import("react-dom/server")).default;

        // Get the selected invoice template
        const templateId = body.details.pdfTemplate;
        console.log(templateId)
        const InvoiceTemplate = await getInvoiceTemplate(templateId);

        // Read the HTML template from a React component
        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
            InvoiceTemplate(body)
        );

        // Create a browser instance
        let browser;
        console.log(ENV)
        // Launch the browser in production or development mode depending on the environment
        if (ENV === "production") {
            const puppeteer = await import("puppeteer-core");
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(
                    CHROMIUM_EXECUTABLE_PATH
                ),
                headless:
                    chromium.headless === "new" ? true : chromium.headless,
            });
        } else if (ENV === "development") {
            const puppeteer = await import("puppeteer");
            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: "new"
            });
        }

        if (!browser) {
            console.log("MEOW")
            throw new Error("Failed to launch browser");
        }

        const page = await browser.newPage();

        // Set the HTML content of the page
        await page.setContent(await htmlTemplate, {
            // * "waitUntil" prop makes fonts work in templates
            waitUntil: "networkidle0",
        });

        // Add Tailwind CSS
        await page.addStyleTag({
            url: TAILWIND_CDN,
        });

        // Generate the PDF
        const pdf: Buffer = await page.pdf({
            format: "a4",
            printBackground: true,
        });

        // Close the Puppeteer browser
        await browser.close();

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdf], { type: "application/pdf" });

        const response = new NextResponse(pdfBlob, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=invoice.pdf",
            },
            status: 200,
        });

        return response;
    } catch (error) {
        console.error(error);

        // Return an error response
        return new NextResponse(`Error generating PDF: \n${error}`, {
            status: 500,
        });
    }
}
