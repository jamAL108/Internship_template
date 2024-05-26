
// @ts-ignore  
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
    Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";


type SendPdfEmailProps = {
    invoiceNumber: string;
};

export default function SendPdfEmail({ invoiceNumber }: SendPdfEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>
                Your invoice #{invoiceNumber} is ready for download
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100">
                    <Container>
                        <Section className="bg-white border-black-950 my-10 px-10 py-4 rounded-md">
                            {/* <Img
                                src={logo}
                                alt="Invoify Logo"
                                width={200}
                                height={120}
                            /> */}
                            <Heading className="leading-tight">
                                Thanks for using Votum!
                            </Heading>

                            <Text>
                                We're pleased to inform you that your invoice{" "}
                                <b>#{invoiceNumber}</b> is ready for download.
                                Please find the attached PDF document.
                            </Text>

                            <Hr />

                            <Text>
                                Best Regards,
                                <br />
                                Votum Team
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
