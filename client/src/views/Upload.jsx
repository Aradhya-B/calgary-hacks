import background from './book_proper_size.jpg'

import axios from 'axios';
import { connect } from 'react-redux';
import { keywordToWikipediaMap } from '../utils';
import { setOriginalNotes, setSummary, setKeywordMap } from '../actions';
import React,{Component} from 'react';
import styled from 'styled-components'
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Title = styled("h1")`
  font-size: 4em;
  text-align: center;
  color: white;
  `;

const Title2 = styled("h2")`
  font-size: 1.5em;
  text-align: center;
  color: white;
  `;

const Button = styled.button`
  color: black;
  font-size: 1em;
  margin: 1em;
  background-color: #A9A9A9;
  padding: 0.45em 0.25em;
  border: 2px solid black;
  border-radius: 3px;
  `;

const Input = styled.input`
  color: black;
  font-size: 1em;
  margin: 1em;
  background-color: #A9A9A9;
  padding: 0.25em 0.25em;
  border: 2px solid black;
  border-radius: 3px;
  `;

const H4= styled("h2")`
  font-size: 1em;
  text-align: center;
  color: white;
  `;

const Div = styled("h1")`
  font-size: 1em;
  text-align: center;
  color: black;
  `;

const divStyle = {
  background: `url(${background}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  height: '100vh',
  overflow: 'hidden'
}

class Upload extends Component {
    state = {

      // Initially, no file is selected
      selectedFile: null,
      loading: false
    };

    // On file select (from the pop up)
    onFileChange = event => {

      // Update the state
      this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = async () => {

      this.setState({loading: true});

      let file = this.state.selectedFile;

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "file",
        file
      );

      // Request made to the backend api
      // Send formData object
      const res = await axios.post("https://neural-notes.herokuapp.com/upload", formData);
      const keywords = [...new Set(res.data.reduce((accum, arr) => accum.concat(arr.keywords), []))];
      const summary = res.data.reduce((accum, arr) => {accum.push(arr.summary); return accum;}, []).join('\n');
      const originalText = res.data.reduce((accum, arr) => {accum.push(arr.text); return accum;}, []).join('\n');

      this.props.setSummary(summary);
      this.props.setOriginalNotes(originalText);
      const keywordToWikiMap = await keywordToWikipediaMap(keywords);

      this.props.setKeywordMap(keywordToWikiMap);
      this.props.history.push('/notes');
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

      if (this.state.selectedFile) {

        return (
          <div>
            <H4>Upload File</H4>
          </div>
        );
      } else {
        return (
          <div>
            <H4>Choose File</H4>
          </div>
        );
      }
    };

    render() {
      return (
        <div style={ divStyle }>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "100%"}}>
          <Title>
              NeuralNotes 🧠
            </Title>
            <Title2>
              supercharge your notes ⚡
            </Title2>
            {
              this.state.loading ?
              <Loader type="ThreeDots" color="#fff" height={100} width={100} style={{textAlign: "center"}} /> :
              <Div>
                <Input type="file" onChange={this.onFileChange} />
                <Button onClick={this.onFileUpload}>
                  Upload!
                </Button>
              </Div>
            }
          {!this.state.loading && this.fileData()}
          </div>
        </div>
      );
    }
  }

  const mapDispatchToProps = {
    setOriginalNotes,
    setSummary,
    setKeywordMap
  }

  export default connect(null, mapDispatchToProps)(Upload);
