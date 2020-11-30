
export const FileHelper = {

    isPdf: (file: any) => {

        return file.name.indexOf('.pdf') >= 0;
    },

    isFileAvailable: (fileList: FileList ) => {

        const exp = /\.(gif|jpe?g|tiff?|png|webp|bmp|pdf)$/i;
        for (let i = 0; i < fileList.length; i++) {
            
            if (!exp.test(fileList[i].name)) {
                return false;
            }            
        }
        
        return true;
    }
};
