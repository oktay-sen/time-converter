import React from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Suggest, ItemPredicate, ItemRenderer, IItemRendererProps } from "@blueprintjs/select";
import _ from 'lodash';
import GeneratedParser from './parsing/GeneratedParser'
import { ParsedTime } from './parsing/Types'

const TimeSuggest = Suggest.ofType<any>()

export interface ParsedTimeInputState {
    currentSuggestion: any[],
    inputText?: string
};

export interface ParsedTimeInputProps {

}

export default class ParsedTimeInput extends React.PureComponent<ParsedTimeInputProps, ParsedTimeInputState> {
  public state: ParsedTimeInputState = {
      currentSuggestion: [],
      inputText: undefined
  }

  private renderSuggestion = (time: any) => JSON.stringify(time)

  private renderSuggestionItem
    = (time: any, props: IItemRendererProps) => 
        <MenuItem
            {...props}
            text={JSON.stringify(time)}
        />

  private handleQueryChange = _.debounce((query: string) => {
      if (!query || query.length === 0) {
          this.setState({currentSuggestion:[]})
          return;
      }
      try {
        let parsedValue = GeneratedParser.parse(query, {})
        console.log(parsedValue)

        this.setState({
            currentSuggestion: [parsedValue]
        })

      } catch(e) {
        this.setState({
            currentSuggestion: [e]
        })
      }
  }, 1000)

  private handleItemSelect(item: any) {
      console.log(item)
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
