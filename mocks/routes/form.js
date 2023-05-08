module.exports = [
    {
        id: "save-form", // route id
        url: "/api/save-form", // url in express format
        method: "POST", // HTTP method
        variants: [
            {
                id: "success", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        data: "Успешное сохранение"
                    }, // body to send
                },
            },
        ],
    }
];
