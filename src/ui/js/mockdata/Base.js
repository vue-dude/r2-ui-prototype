const languages = {
    ar: 'Arabic',
    bg: 'Bulgarian',
    zh: 'Chinese',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pl: 'Polish',
    pt: 'Portuguese',
    ru: 'Russian',
    es: 'Spanish',
    sv: 'Swedish'
}

const licenses = 'Creative Commons CC_BY,Open Publication License,Design Science License (DSL),FreeBSD Documentation License,GNU Free Documentation License'.split(
    ','
)

const getMockOptions = (key, num) => {
    // non generic for element-ui dropdowns, key-value
    const res = []
    if (key === 'languages') {
        _.each(languages, (label, value) =>
            res.push({
                label,
                value
            })
        )
    } else if (key === 'licenses') {
        _.each(licenses, (label, value) =>
            res.push({
                label,
                value
            })
        )
    } else {
        for (let index = 1; index < num; index++) {
            res.push({
                label: `${key}-${index}`,
                value: `${key}-${index}`
            })
        }
    }
    return res
}

export { languages, licenses, getMockOptions }
