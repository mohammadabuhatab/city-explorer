import React from 'react';
import {Button,Form} from 'react-bootstrap/';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      search:'',
      locData:'',
      displayMap:false,
      error : false
    }
  }

  updateText=(event)=>{
    this.setState({
      search: event.target.value, 
    })
    console.log(this.state.search);
  }
  getLOcation = async (e) =>{
    e.preventDefault();
    let locUrl = `https://eu1.locationiq.com/v1/search.php?key=pk.b6a5cec0e0fa9b2e067c90ea37e22aee&q=${this.state.search}&format=json`;
    let locResult = await axios.get(locUrl);
    this.setState({
      locData: locResult.data[0],
      displayMap : true})
    console.log(locResult);
  }

  render(){
    return(
  <>
<Form onSubmit={this.getLOcation}>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>add a city</Form.Label>
    <Form.Control onChange={this.updateText} type="text" placeholder="add a city" custom/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<p>{this.state.locData.display_name}</p>
<p>{this.state.locData.lon}</p>
<p>{this.state.locData.lat}</p>
{ this.state.displayMap && <img
 src={`https://maps.locationiq.com/v3/staticmap?key=pk.b6a5cec0e0fa9b2e067c90ea37e22aee&center=${this.state.locData.lat},${this.state.locData.lon}`} alt=''
/>}
</>
)}}
export default App;
