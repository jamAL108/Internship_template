'use client';
import clientConnectionWithSupabase from "@/lib/supabase/client";
import { formatDate } from '@/utils/dateRelated'
import { createBlob } from '@/utils/file'

export const getAllClients = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { success: false, message: "User session Not Found" }
    }
    let { data: votum_user_clients, error } = await supabase
        .from('votum_user_clients')
        .select("id,Name,Email,Contact,Address")
        .eq('user_id', parsedUserDetails.id)
        .order('created_at')

    if (error === null) {
        return { success: true, data: votum_user_clients }
    }
    else {
        return { success: false, error: error.message }
    }
}
export const addInvoice = async (FormData: any) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { success: false, message: "User session Not Found" }
    }

    let particulars: any = {}
    for (var i = 0; i < FormData.particularKey.length; i++) {
        let key = FormData.particularKey[i]
        particulars[key] = FormData.particularValue[i]
    }
    console.log(particulars)
    let particularsValue: any = JSON.stringify(particulars)
    const obj = {
        ...FormData.form,
        particulars: particularsValue,
        user_id: parsedUserDetails.id
    }
    console.log(obj)
    const { data, error } = await supabase
        .from('votum_user_invoice')
        .insert([obj])
        .select()
    console.log(error)
    console.log(data)
    if (error === null) {
        return { success: true }
    }
    else {
        return { success: false, error: error.message }
    }
}


export const getAllInvoice = async () => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { success: false, message: "User session Not Found" }
    }
    let { data: votum_user_invoice, error } = await supabase
        .from('votum_user_invoice')
        .select(`*, votum_user_clients (
            Name,Email
          )`)
        .eq('user_id', parsedUserDetails.id)
    console.log(votum_user_invoice)
    if (error === null) {
        return { success: true, data: votum_user_invoice }
    } else {
        return { success: false, error: error.message }
    }
}




export const generateInvoice = async (formdata: any) => {
    let items = []
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
            "address": "",
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
    console.log(obj)
    const URL = 'https://www.thevotum.com/api/invoice/generate'
    // const URL = 'http://localhost:3000/api/invoice/generate'
    // fetch(URL, {
    //     method: "POST",
    //     body: JSON.stringify(obj),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    //     .then((res) => res.blob())
    //     .then((blob) => {
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = `invoice.pdf`;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //         return { success: true }
    //     })
    //     .catch((error) => {
    //         console.error("Error downloading:", error);
    //         return { success: false, error: error }
    //     });
    try {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error("Error downloading:", error);
        return { success: false, error: error };
    }
};


export const getClientDetail = async (clientId: string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    let { data: votum_user_client, error }: any = await supabase
        .from('votum_user_clients')
        .select("*")
        .eq('user_id', parsedUserDetails.id)
        .eq('id', clientId)

    const client_object = {
        ...votum_user_client[0],
    }

    if (error !== null) {
        return { success: false, error: "unable to fetch" }
    }
    if (votum_user_client.length === 0) {
        return { success: false, error: "client doesn't exists" }
    } else {
        return { success: true, data: client_object }
    }
}


export const sendInvoiceToMail = async (formdata: any) => {

    let items = []
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
            "address": "",
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

    console.log(obj)

    const URL = 'https://www.thevotum.com/api/invoice/'
    // const URL = 'http://localhost:3000/api/invoice'

    const response = await fetch(`${URL}/generate`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }
    const blob = await response.blob();
    const file = new File([blob], 'Invoice.pdf', { type: blob.type });

    const fd = new FormData();
    fd.append("email", obj.receiver.email);
    fd.append('sender', obj.sender.name)
    fd.append("invoicePdf", file, "invoice.pdf");
    fd.append("invoiceNumber", obj.details.invoiceNumber);

    try {
        const response = await fetch(`${URL}/send`, {
            method: "POST",
            body: fd,
        });

        if (response.ok) {
            return { success: true }
        } else {
            return { success: false, error: "An error occured while sending mail" }
        }
    } catch (error) {
        console.log(error);
        return { success: false, error: error }
    }
}



export const deleteInvoice = async (invoiceID: string) => {
    const supabase = clientConnectionWithSupabase()
    const userDetails: any = localStorage.getItem('VotumUserDetails')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)
    if (parsedUserDetails === null) {
        return { error: "User session Not Found" }
    }
    const { error } = await supabase
        .from('votum_user_invoice')
        .delete()
        .eq('id', invoiceID)

    if (error === null) {
        return { success: true }
    } else {
        return { success: false, error: error.message }
    }
}