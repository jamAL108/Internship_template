'use client';
import jsonData from './script.json';
export const getPrecedentContent = async (formdata: any) => {
    try {
        return { success: true, data: jsonData }
    } catch (error) {
        return { success: false, error: error }
    }
}