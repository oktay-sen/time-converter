import GeneratedParser from './GeneratedParser'

export function parse(input: String): any {
    try {
        return GeneratedParser.parse(input)
    } catch (e: any) {
        return e.message
    }
}
