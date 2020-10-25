import React from 'react';
import { MenuItem } from "@blueprintjs/core";
import { Suggest, IItemRendererProps } from "@blueprintjs/select";
import GeneratedParser from './parsing/GeneratedParser'
import { ParsedTime, TimeType } from './parsing/Types'

const TimeSuggest = Suggest.ofType<ParsedTime>()

export interface ParsedTimeInputState {
  currentSuggestion: ParsedTime[],
  inputText?: string
};

export interface ParsedTimeInputProps {
  onTimeSelect?: (parsedTime: ParsedTime) => any
}

export default class ParsedTimeInput extends React.PureComponent<ParsedTimeInputProps, ParsedTimeInputState> {
  public state: ParsedTimeInputState = {
    currentSuggestion: [],
    inputText: undefined
  }

  private renderSuggestion = (time: ParsedTime) => time.friendlyText

  private renderSuggestionItem
    = (time: ParsedTime, props: IItemRendererProps) => {
      if (time.type === TimeType.UnparsedDate) {
        return <MenuItem
          {...props}
          text={(time.getValue() as Error).message}
          label="Error"
          disabled
        />
      } else {
        return <MenuItem
          {...props}
          text={time.friendlyText}
          label={time.type}
        />
      }
    }

  private handleQueryChange = (query: string) => {
    if (query === this.state.inputText) {
      return;
    }
    if (!query || query.length === 0) {
      this.setState({ inputText: query, currentSuggestion: [] })
      return;
    }
    try {
      const parsedValue = GeneratedParser.parse(query, {})
      this.setState({
        inputText: query,
        currentSuggestion: [parsedValue]
      })

    } catch (e) {
      if (e instanceof Error) {
        const newError = new Error('Could not parse input: "' + query + '"')
        newError.stack += '\nCaused by: ' + e.stack
        this.setState({
          inputText: query,
          currentSuggestion: [{
            type: TimeType.UnparsedDate,
            friendlyText: query,
            getValue: () => newError
          }]
        })
      }
    }
  }

  private handleItemSelect = (item: ParsedTime) => {
    if (this.props.onTimeSelect) {
      this.props.onTimeSelect(item)
    }

    this.setState({
      inputText: item.friendlyText
    })

    if (item.type === TimeType.UnparsedDate) {
      console.error(item.getValue())
    }
  }

  public render() {
    const { currentSuggestion, inputText } = this.state
    return (
      <TimeSuggest
        items={currentSuggestion}
        inputValueRenderer={this.renderSuggestion}
        itemRenderer={this.renderSuggestionItem}
        noResults={<MenuItem disabled={true} text="Type a date in " />}
        query={inputText}
        onQueryChange={this.handleQueryChange}
        onItemSelect={this.handleItemSelect}
      />
    );
  }
}
