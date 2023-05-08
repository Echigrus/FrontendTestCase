class CompanyInfoResp {
    suggestions: Array<{
        data: {
            state: {
                registration_date: number
            },
            name: {
                full_with_opf: string,
                short_with_opf: string
            },
            ogrn: string
        }
    }>
}

export { CompanyInfoResp };