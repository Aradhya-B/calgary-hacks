import axios from 'axios';
import React,{Component} from 'react';
import styled from 'styled-components'
import background from './book_proper_size.jpg'

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

  const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457"
    }
  };

var sectionStyle = {
  backgroundImage: `url(${background})`
}

const Button = styled.button`
  color: black;
  font-size: 1em;
  margin: 1em;
  background-color: #FFFFFF;
  padding: 0.45em 0.25em;
  border: 2px solid black;
  border-radius: 3px;
  cursor: pointer;
  `;

const Input = styled.input`
  color: black;
  font-size: 1em;
  margin: 1em;
  background-color:	#FFFFFF;
  padding: 0.25em 0.25em;
  border: 2px solid black;
  border-radius: 3px;
  cursor: pointer;
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

class App extends Component {



    state = {

      // Initially, no file is selected
      selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

      // Update the state
      this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

      if (this.state.selectedFile) {

        return (
          <div>
            <H4>Upload File</H4>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        );
      } else {
        return (
          <div>
            <H4>Choose File</H4>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        );
      }
    };

    render() {

      return (
        <section style={ sectionStyle }>
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <Title>
              crammer.io
            </Title>
            <Title2>
              supercharge your notes ⚡
            </Title2>
            <Div>
                <Input type="file" onChange={this.onFileChange} />
                <Button onClick={this.onFileUpload}>
                  Upload
                </Button>
            </Div>
          {this.fileData()}
        </div>
        </section>
      );
    }
  }

  export default App;
