'use client';
import React, { useEffect, useState } from "react";
import DynamicInvoiceTemplate from "@/components/templates/invoice-pdf/DynamicInvoiceTemplate";
import { formatDate } from '@/utils/dateRelated'
import { createBlob } from '@/utils/file'

export default function LivePreview({ formdata }: any) {
    console.log(formdata)
    const [loader, setLoader] = useState<boolean>(true)
    const [previewdata, setPreviewData] = useState<any>(null)
    useEffect(() => {
        const makePreviewdata = () => {
            let items = []
            if (formdata!==null && formdata.raiseModal === true) {
                for (var i = 0; i < formdata.particularKey.length; i++) {
                    let item = {
                        "name": formdata.particularKey[i],
                        "description": "A new Items",
                        "quantity": 7,
                        "unitPrice": formdata.particularValue[i],
                        "total": formdata.particularValue[i]
                    }
                    items.push(item)
                }
                const obj = {
                    sender: {
                        "name": formdata.senderName,
                        "address": "12345",
                        "zipCode": "400024",
                        "city": "Mumbai",
                        "country": "India",
                        "email": formdata.senderEmail,
                        "phone": formdata.senderContact,
                        "customInputs": []
                    },
                    receiver: {
                        "name": formdata.clientName,
                        "address": formdata.clientAddress,
                        "zipCode": "",
                        "city": "",
                        "country": '',
                        "email": formdata.clientEmail,
                        "phone": formdata.clientContact,
                        "customInputs": [
                            // {
                            //     "key": "sdf",
                            //     "value": "swf"
                            // }
                        ]
                    },
                    details: {
                        "invoiceLogo": createBlob(formdata.Logo),
                        "invoiceNumber": formdata.invoiceNumber,
                        "invoiceDate": formatDate(formdata.invoiceDate),
                        "dueDate": formatDate(formdata.dueDate),
                        "currency": "Rupee",
                        "language": "English",
                        "items": items,
                        "paymentInformation": {
                            "bankName": formdata.bankName,
                            "accountName": formdata.accountName,
                            "accountNumber": formdata.accountNumber
                        },
                        "taxDetails": {
                            "amount": 0,
                            "taxID": "",
                            "amountType": "amount"
                        },
                        "discountDetails": {
                            "amount": 0,
                            "amountType": "amount"
                        },
                        "shippingDetails": {
                            "cost": 0,
                            "costType": "amount"
                        },
                        "subTotal": formdata.totalAmount,
                        "totalAmount": formdata.totalAmount,
                        "totalAmountInWords": "Fifty-six",
                        "additionalNotes": formdata.additionalNotes,
                        "paymentTerms": formdata.paymentTerms,
                        "pdfTemplate": 2
                    }
                }
                setPreviewData(obj)
                setLoader(false)
            }
        }
        makePreviewdata()
    }, [formdata.raiseModal])
    return (
        <>
            {
                previewdata === null && loader === true ? (
                    <div>
                        Loading....
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <h1>Live Preview:</h1>
                        <div className="border dark:border-gray-600 h-[95%] previewPDFPage overflow-y-auto rounded-xl my-1">
                            <DynamicInvoiceTemplate {...previewdata} />
                        </div>
                    </div>
                )
            }
        </>
    );
}
