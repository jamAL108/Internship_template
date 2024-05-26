export const createBlob = (file: any) => {
    // if (file) {
    //     const blob = new Blob([file], { type: file.type });
    //     // Now you can use 'blob' as needed, such as uploading to a server
    //     console.log(blob);
    //     return blob
    // } else {
    //     return ''
    // }
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event:any) {
            const imageData = event.target.result;
            return imageData
        };
        reader.readAsDataURL(file);
    }else{
        return ''
    }
};