
import React from 'react'
import {Button, Card, Grid, Header, Image, Label} from "semantic-ui-react";

export class VehicleImagesForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            placeholderUrl: '../img_placeholder.png',
            coverUrl: undefined,
            img2: undefined,
            img3: undefined,
            img4: undefined,
            img5: undefined,
            img6: undefined,
            files: []
        };
    }

    handleFileCover = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0],
            files: [e.target.files[0], ...this.state.files],
            coverUrl: URL.createObjectURL(e.target.files[0])
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0],
            files: [...this.state.files, e.target.files[0]],
            [e.target.name]: e.target.files[0]?URL.createObjectURL(e.target.files[0]):undefined
        })
    };

    render() {
        const {prevStep, nextStep} = this.props;
        console.log(this.state)
        return (
            <Card fluid>
                <Card.Content>
                    <Header content='Some Images'/>
                </Card.Content>
                <Card.Content>
                    <Grid textAlign='center' columns={3}>
                        <Grid.Column align="center" style={{height: '200px', width: '200px'}}>
                            <label htmlFor="cover">
                                <Image id='img_1' fluid src={this.state.coverUrl === undefined ? this.state.placeholderUrl: this.state.coverUrl}
                                       style={{height: '100%', width: '100%', paddingTop: '20px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Front'/>
                            <input type='file' name='cover' id='cover' hidden onChange={this.handleFileCover}/>
                        </Grid.Column>
                        <Grid.Column style={{height: '200px', width: '200px'}}>
                            <label htmlFor="single2">
                                <Image id='img_2' fluid src={this.state.img2 === undefined ? this.state.placeholderUrl: this.state.img2} rounded
                                       style={{height: '100%', width: '100%', paddingTop: '10px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Left Side'/>
                            <input type='file' name='img2' id='single2' hidden onChange={this.handleChange}/>
                        </Grid.Column>
                        <Grid.Column style={{height: '200px', width: '200px'}}>
                            <label htmlFor="single3">
                                <Image id='img_3' centered fluid src={this.state.img3 === undefined ? this.state.placeholderUrl: this.state.img3} rounded
                                       style={{height: '100%', width: '100%', paddingTop: '10px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Right Side'/>
                            <input type='file' name='img3' id='single3' hidden onChange={this.handleChange}/>
                        </Grid.Column>
                        <Grid.Column style={{height: '200px', width: '200px'}}>
                            <label htmlFor="single4">
                                <Image id='img_4' centered fluid src={this.state.img4 === undefined ? this.state.placeholderUrl: this.state.img4} rounded
                                       style={{height: '100%', width: '100%', paddingTop: '10px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Back'/>
                            <input type='file' name='img4' id='single4' hidden onChange={this.handleChange}/>
                        </Grid.Column>
                        <Grid.Column style={{height: '200px', width: '200px'}}>
                            <label htmlFor="single5">
                                <Image id='img_5' centered fluid src={this.state.img5 === undefined ? this.state.placeholderUrl: this.state.img5} rounded
                                       style={{height: '100%', width: '100%', paddingTop: '10px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Dashboard'/>
                            <input type='file' name='img5' id='single5' hidden onChange={this.handleChange}/>
                        </Grid.Column>
                        <Grid.Column style={{height: '200px', width: '200px'}}>
                            <label htmlFor="single6">
                                <Image verticalAlign='bottom' id='img_6' centered fluid src={this.state.img6 === undefined ? this.state.placeholderUrl: this.state.img6}
                                       rounded style={{height: '100%', width: '100%', paddingTop: '10px'}}/>
                            </label>
                            <Label style={{backgroundColor: 'transparent'}} attached='top' content='Vehicle Interior'/>
                            <input type='file' name='img6' id='single6' hidden onChange={this.handleChange}/>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    <Button type="submit" content='Next' positive onClick={()=>nextStep(this.state.files)} floated='right'/>
                    <Button type="submit" content='Back' secondary onClick={prevStep} floated='right'/>
                </Card.Content>
            </Card>
        )
    }
}