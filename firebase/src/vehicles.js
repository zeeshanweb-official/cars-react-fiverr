import React from 'react'

export default class VehicleList extends React.Component {

    render(){
        return (
            <div>
                {
                    this.props.vehicleList.map((vehicle, i) => (
                        <p>
                            {
                            
                            }
                        </p>
                    ))
                }
            </div>
        )
    }
}