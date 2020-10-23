Date = DynamicDate / BeforeDate / AfterDate / UnparsedDate

AfterDate = durations:Durations (From / After) date:Date {
    return {
        type: 'AfterDate',
        date: date,
        duration: durations
    }
}

BeforeDate = durations:Durations Before date:Date {
    return {
        type: 'BeforeDate',
        date: date,
        duration: durations
    }
}

UnparsedDate = chunks:UnparsedChunk+ {
    let unparsedString = chunks.join(' ').trim()
    let parsedDate = moment.parseZone(unparsedString)
    // console.log('Found unparsed string ',unparsedString,' result:', parsedDate)
    if (parsedDate.isValid()) {
        return {
            type: 'StaticDate',
            getValue: () => parsedDate
        }
    } else {
        return {
            type: 'UnparsedDate',
            value: chunks.join(' '),
            getValue: () => parsedDate
        }
    }
}

UnparsedChunk = !(SimpleDynamicDate / Duration / Ago / From / Before / After / And) chunk:[^ ]+ _ {
    return chunk.join('')
}

DynamicDate = date:(SimpleDynamicDate / DurationAgo) {
    return {
        type: 'DynamicDate',
        value: date
    }
}

SimpleDynamicDate = word:("now"i / "today"i / "yesterday"i) _ {
    return {
        type: 'SimpleDynamicDate',
        value: word.toLowerCase()
    }
}

DurationAgo = durations:Durations Ago {
    return {
        type: 'Ago',
        value: durations
    }
}


Durations = first:Duration rest:(And? Duration)* {
    const durations = [first]
    durations.push(...rest.map(andDuration => andDuration[1]))
    return durations
}

Duration = num:Num _ unit:DurationUnit _ {
    return {
        type: 'Duration',
        unit: unit,
        value: num
    }
}

DurationUnit = Milliseconds / Seconds / Minutes / Hours / Days / Months / Years

Milliseconds = ("millisecond"i "s"i? / "ms"i) {
    return {
        type: 'DurationUnit',
        name: 'milliseconds'
    }
}

Seconds = ("second"i "s"i? / "s"i !("t"i)) {
    return {
        type: 'DurationUnit',
        name: 'seconds'
    }
}

Minutes = ("min"i "ute"i? "s"i? / "m" !("o"i / "il"i)) {
    return {
        type: 'DurationUnit',
        name: 'minutes'
    }
}

Hours = (("hour"i "s"i?) / ("hr"i "s"i?) / "h"i) {
    return {
        type: 'DurationUnit',
        name: 'hours'
    }
}

Days = (("day"i "s"i?) / "d"i) {
    return {
        type: 'DurationUnit',
        name: 'days'
    }
}

Months = ("month"i "s"i?) {
    return {
        type: 'DurationUnit',
        name: 'months'
    }
}

Years = (("year"i "s"i?) / ("yr"i "s"i?) / "y"i) {
    return {
        type: 'DurationUnit',
        name: 'years'
    }
}

Num = num:[0-9]+ { return parseInt(num, 10) }

Ago = "ago"i _ 
And = "and"i _ 
From = "from"i _ 
Before = "before"i _ 
After = "after"i _ 
Every = "every"i _
At = "at"i _

Th = ("st"i / "nd"i / "rd"i) _

_ = " "*