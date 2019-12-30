import React, { Component } from "react";
import "./editableInput.css";

class EditableText extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      text: "",
      edit: false
    };
  }

  listnerHandler(e) {
    const { text } = this.state;
    const { editable } = this.props;
    console.log("clicked")
    if (editable && e.target !== this.inputRef.current && text !== "") {
      this.setState({ edit: false });
    }
  };

  componentDidMount() {
    const { edit, editable, value } = this.props;
    this.setState({ edit: edit, text: value }, () => {
      const { text } = this.state;
      if (editable && text === "") {
        this.setState({ edit: true });
      }
    });
    window.addEventListener("mousedown", e => this.listnerHandler(e));
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", e => this.listnerHandler(e))
  }

  setInputHeight(inputRef) {
    let remain = inputRef.offsetHeight - inputRef.clientHeight;
    inputRef.style.height = ''
    inputRef.style.height = `${inputRef.scrollHeight}px`;
  }

  handleInput(e) {
    const { onChange } = this.props;
    this.setState({ text: e.target.value });
    this.setInputHeight(this.inputRef.current);
    if (onChange) {
      onChange(e);
    }
  }

  render() {
    const { editable, maxLength, rows, placeholder } = this.props;
    const { text, edit } = this.state;
    return editable ? (
      edit ? (
        <textarea
          onFocus={e => {
            this.setInputHeight(e.target)
            e.target.setSelectionRange(this.state.text.length, this.state.text.length)
          }}
          ref={this.inputRef}
          rows={rows}
          autoFocus
          className="editableInput editEditableInputTitle"
          type="text"
          value={text}
          onChange={e => this.handleInput(e)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      ) : (
        <span
          className="editableInput editHover"
          onDoubleClick={() => this.setState({ edit: true })}
        >
          {text}
        </span>
      )
    ) : (
      <span className="editableInput">{text}</span>
    );
  }
}

EditableText.defaultProps = {
  maxLength: "50",
  rows: "1",
  placeholder: "Enter some text",
  editable: false,
  value: ""
};

export default EditableText;
