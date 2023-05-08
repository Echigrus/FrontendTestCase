module.exports = [
    {
        id: "upload-img", // route id
        url: "/api/upload-img", // url in express format
        method: "POST", // HTTP method
        variants: [
            {
                id: "success", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        name: "xxx.png",
                        status: "done",
                        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                        thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }, // body to send
                },
            },
        ],
    }
];
