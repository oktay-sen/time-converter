declare module 'parsing/GeneratedParser' {
    class SyntaxError extends Error {}

    interface ParserOptions {
        startRule?: string,
        tracer?: string
    }

    export default class GeneratedParser {
        SyntaxError: SyntaxError
        parse: (input: string, options?: ParserOptions) => any
    }
}