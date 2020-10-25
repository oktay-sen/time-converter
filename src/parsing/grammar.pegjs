{
    const epochSecondThreshold = 100000000
    const epochMilisecondThreshold = 100000000000
}

Date = DynamicDate / BeforeDate / AfterDate / EpochSeconds / EpochMilliseconds / UnparsedDate

AfterDate = durations:Durations fromText:(From / After) date:Date {
    return {
        type: 'AfterDate',
        friendlyText: durations.friendlyText + ' ' + fromText + ' ' + date.friendlyText,
        getValue: () => durations.addTo(date.getValue())
    }
}

BeforeDate = durations:Durations Before date:Date {
    return {
        type: 'BeforeDate',
        friendlyText: durations.friendlyText + ' before ' + date.friendlyText,
        getValue: () => durations.subtractFrom(date.getValue())
    }
}

UnparsedDate = chunks:$UnparsedChunk+ {
    const unparsedString = chunks.trim()
    const parsedDate = moment.parseZone(unparsedString)
    if (parsedDate.isValid()) {
        return {
            type: 'StaticDate',
            friendlyText: unparsedString,
            getValue: () => parsedDate
        }
    } else {
        return {
            type: 'UnparsedDate',
            friendlyText: unparsedString,
            getValue: () => new Error('Could not parse date: "' + unparsedString + '"')
        }
    }
}

UnparsedChunk = !(SimpleDynamicDate / Duration / From / Before / After / And / EpochSeconds / EpochMilliseconds) chunk:$[^ ]+ _ {
    return chunk
}

DynamicDate = SimpleDynamicDate / DurationAgo

SimpleDynamicDate = Now / Today / Yesterday

Now = "now"i _ {
    return {
        type: 'SimpleDynamicDate',
        friendlyText: 'now',
        getValue: () => moment()
    }
}

Today = "today"i _ {
    return {
        type: 'SimpleDynamicDate',
        friendlyText: 'today',
        getValue: () => moment().startOf('day')
    }
}

Yesterday = "yesterday"i _ {
    return {
        type: 'SimpleDynamicDate',
        friendlyText: 'yesterday',
        getValue: () => moment().startOf('day').subtract(1, 'day')
    }
}

DurationAgo = durations:Durations Ago {
    return {
        type: 'Ago',
        friendlyText: durations.friendlyText + " ago",
        getValue: () => durations.subtractFrom(moment())
    }
}


Durations = first:Duration rest:(And? Duration)* &(Ago / From / After / Before) {
    const durations = [first]
    durations.push(...rest.map(andDuration => andDuration[1]))

    return {
        type: "duration",
        value: durations,
        friendlyText: durations.map(d => d.value + " " + d.unit).join(", "),
        addTo: moment => durations.reduce((m, d) => m.add(d.value, d.unit), moment),
        subtractFrom: moment => durations.reduce((m, d) => m.subtract(d.value, d.unit), moment)
    }
}

Duration = num:SmallNum unit:DurationUnit _ {
    return {
        unit: unit.name,
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

SmallNum = num:Num &{ return num < epochSecondThreshold } { return num }

EpochSeconds = num:Num &{ return num >= epochSecondThreshold && num < epochMilisecondThreshold } {
    return {
        type: 'EpochSecond',
        friendlyText: '' + num,
        getValue: () => moment.unix(num)
    }
}

EpochMilliseconds = num:Num &{ return num >= epochMilisecondThreshold } {
    return {
        type: 'EpochMillisecond',
        friendlyText: '' + num,
        getValue: () => moment(num)
    }
}

Num = num:$[0-9]+ _ { return parseInt(num, 10) }

Ago = "ago"i _ 
And = "and"i _ 
From = "from"i _ { return 'from' }
Before = "before"i _ { return 'before' }
After = "after"i _ 
Every = "every"i _
At = "at"i _

Th = ("st"i / "nd"i / "rd"i) _

_ = " "*