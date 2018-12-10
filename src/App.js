
import React, { Component } from 'react';
import {  EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHighlightPlugin from './highlightPlugin';

const highlightPlugin = createHighlightPlugin({
  background: 'purple'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if(newState){
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  }



  render() {
    return (
      <div className='App'>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button onClick={this.onToggleCode}>Code Block</button>
        <div style={{display:'inline'}} > cmd +h to highlight</div>
        <div className='Editor'>
        <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand}
        plugins={[highlightPlugin]}
      />
        </div>
        
      </div>
    );
  }
}

export default App;

