import React from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
export const AddOption = () => {
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form>
        <FormGroup>
            <Label>
                Name
            </Label>
            <Input type = "text" placeholder ="Stock Ticker">
            </Input>
        </FormGroup>
        <Button type = "submit">Submit</Button>
        <Link to = "/" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
