import React from 'react'
import { Grid, List } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";

class VehicleInfo extends React.Component {
    render() {
        const { state } = this.props.location
        const images = state.images.map(image => {
            return { original: `https://car-listing-api.herokuapp.com/image/${image.filename}`,
            thumbnail: `https://car-listing-api.herokuapp.com/image/${image.filename}` }
        })
        return (
            <Grid columns={3}>
                <Grid.Column width='5'></Grid.Column>
                <Grid.Column width='6'>
                    <ImageGallery showPlayButton={false} slideOnThumbnailHover={true} showBullets showFullscreenButton={false} items={images} />
                </Grid.Column>
                <Grid.Column width='5'>
                    <List>
                        <List.Item>
                            <List.Header>Car Model</List.Header>
                            {state.car_model}
                        </List.Item>
                        <List.Item>
                            <List.Header>Car Type</List.Header>
                            {state.car_type}
                        </List.Item>
                        <List.Item>
                            <List.Header>Car Make</List.Header>
                            {state.car_make}
                        </List.Item>
                        <List.Item>
                            <List.Header>Transmission</List.Header>
                            {state.transmission}
                        </List.Item>
                        <List.Item>
                            <List.Header>Condition</List.Header>
                            {state.condition}
                        </List.Item>
                        <List.Item>
                            <List.Header>Location</List.Header>
                            {`${state.town}, ${state.county} County`}
                        </List.Item>
                        <List.Item>
                            <List.Header>Selling  Price</List.Header>
                            {`Ksh ${state.price}`}
                        </List.Item>
                        <List.Item>
                            <List.Header>Contact Person</List.Header>
                            {`${state.full_name} - ${state.phone_number}`}
                        </List.Item>
                    </List>
            </Grid.Column>
            </Grid>
        )
    }
}

export default VehicleInfo