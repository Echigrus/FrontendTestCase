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

    public static SocialNetworks = [
        { name: "ВКонтакте", prefix: "vk.com/" },
        { name: "Instagram", prefix: "instagram.com/" },
        { name: "YouTube", prefix: "youtube.com/" }
    ];

    public static UploadImg = {
        maxWidth: 5120,
        maxHeight: 5120,
        minWidth: 200,
        minHeight: 200,
        maxSize: 10485760
    };

    public static ApiKey = "49a0c53e1b18467d140f4bba4c70aa25d582fb71";

    public static CompanyInfoUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs";
};

export { GlobalConstants };