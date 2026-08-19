export function filterQuestions(data, queryObj) {
    let result = data
    if (queryObj.title) {
        result = result.filter((title) => title.title.toLowerCase().includes(queryObj.title.toLowerCase()))
    }
    if (queryObj.tags) {
        result = result.filter((tags) => tags.tags.includes(queryObj.tags))
    }
    if (queryObj.isAnswered) {
        const wanted = queryObj.isAnswered === 'true'
        result = result.filter((i) => i.isAnswered === wanted)
    }
    return result
}