import * as process from "process";

class GlobalConstants {
    ///Точка входа
    public static MainRoot = 'ftc-root';

    /**
     * URL бэкенда
     */
    public static BaseUrl = process.env.API_URL;
    
    /**
     * Длительность оповещения в сек.
     */
    public static NotificationDuration = 3;
};

export { GlobalConstants };