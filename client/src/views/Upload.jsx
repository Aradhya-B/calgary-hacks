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
  color: black;
  `;

const Title2 = styled("h2")`
  font-size: 1.5em;
  text-align: center;
  color: black;
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
  color: black;
  `;

const Div = styled("h1")`
  font-size: 1em;
  text-align: center;
  color: black;
  `;

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
      // await axios.post("http://localhost:5000/upload", formData)
      const res = await new Promise((resolve, reject) => resolve({data: [{
        "keywords":[
           "degradation",
           "persistence",
           "message",
           "Stability"
        ],
        "summary":[
           {
              "summary_text":"It could be that in certain cells, the message is protected so that it hangs around longer. And, in other cells, perhaps, it's unprotected and it's degraded very rapidly. If it's persistent for a long time, it can make a lot of copies of protein."
           }
        ],
        "text":"Stability means the persistence of the message, the degradation of the message. It could be that in certain cells, the message is protected so that it hangs around longer. And, in other cells, perhaps, it's unprotected and it's degraded very rapidly. If it's degraded very rapidly, it doesn't get a chance to make a protein or maybe it doesn't get to make too many copies of the protein. If it's persistent for a long time, it can make a lot of copies of protein. "
     },
     {
        "keywords":[
           "mRNA",
           "translation"
        ],
        "summary":[
           {
              "summary_text":"The ability to regulate translation in a number of different ways is important. There are exciting new genes called micro RNA's that can interfere with translatability. organisms can tweak up or down how actively a particular message is being translated. And then, of course, there's post-translational control."
           }
        ],
        "text":"All of those things can and do occur. Then, of course, there is the regulation at the level of translation. Translation, if I give you an mRNA, is it automatically going to be translated? Maybe the cell has a way to sequester the RNA to ramp it up in some way so that it doesn't get to the ribosome under some conditions, and under other conditions it does get to the ribosome, or some ways to block, in other manners than just sequestering it, but to physically block whether or not this message gets translated. Well, it turns out that there's a tremendous amount of that. It's, again, not the most common, but we're learning, particularly over the last couple of years, that regulation of the translation of an mRNA is important. There are, although I won't talk about them at length, an exciting new set of genes called micro RNA's, teeny little RNAs that encode 21-22 base pair segments that are able to pair with a messenger RNA and interfere in some ways partially with its translatability. And so, by the number and the kinds of little micro RNAs that are there, organisms can tweak up or down how actively a particular message is being translated. So, the ability to regulate translation in a number of different ways is important. And then, of course, there's post-translational control. "
     }]}));
      const keywords = [...new Set(res.data.reduce((accum, arr) => accum.concat(arr.keywords), []))];
      const summary = res.data.reduce((accum, arr) => {accum.push(arr.summary[0].summary_text); return accum;}, []).join('\n');
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
        <div>
            <Title>
              crammer.io
            </Title>
            <Title2>
              supercharge your notes ⚡
            </Title2>
            {
              this.state.loading ?
              <Loader type="ThreeDots" color="#000" height={100} width={100} style={{textAlign: "center"}} /> :
              <Div>
                <Input type="file" onChange={this.onFileChange} />
                <Button onClick={this.onFileUpload}>
                  Upload!
                </Button>
              </Div>
            }
          {!this.state.loading && this.fileData()}
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