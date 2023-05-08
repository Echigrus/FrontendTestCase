import * as process from "process";

class GlobalConstants {
    ///Точка входа
    public static MainRoot = 'ftc-root';

    /**
     * URL бэкенда
     */
    public static BaseUrl = process.env.API_URL;
    
    public static Countries = ['Россия', 'Беларусь', 'Казахстан'];

    public static Regions = ['Москва', 'Московская область', 'Краснодарский край', 'Санкт-Петербург'];

    public static Cities = ['Москва', 'Санкт-Петербург', 'Минск', 'Астана', 'Алматы'];

    public static UploadImg = {
        maxWidth: 5120,
        maxHeight: 5120,
        minWidth: 200,
        minHeight: 200,
        maxSize: 10485760
    };
};

export { GlobalConstants };