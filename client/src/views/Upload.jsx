import axios from 'axios';
import React,{Component} from 'react';
import styled from 'styled-components'

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

      let file = this.state.selectedFile;

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "file",
        file
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      axios.post("http://localhost:5000/upload", formData)
      .then(res => console.log(res));
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
            <Div>
                <Input type="file" onChange={this.onFileChange} />
                <Button onClick={this.onFileUpload}>
                  Upload!
                </Button>
            </Div>
          {this.fileData()}
        </div>
      );
    }
  }

  export default App;

const Upload = () => {
  return (
    <div>
      Upload page
    </div>
  )
}
