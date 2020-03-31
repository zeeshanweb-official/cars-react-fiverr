import React from 'react'
import {Route, Router} from 'react-router-dom'
import {Grid} from "semantic-ui-react"
import history from './history'
import ProtectedRoute from '../routes/protected'
import MainPage from '../components/main_page'
import ListVehicles from '../components/list_vehicles'
import AdminListVehicles from '../components/list_vehicles_admin'
import VehicleInfo from '../components/vehicle_info'
import SellToUs from '../components/sell_to_us'
import AdminLogin from "../components/auth/admin-login";
import AdminSignUp from "../components/auth/admin-signup";
import PostVehicleMainForm from "../components/post_vehicle_form";

const Main = () => (
    <Router history={history}>
        <Grid>
            <Route exact path="/" component={ListVehicles}/>
            <Route exact path="/vehicles" component={ListVehicles}/>
            {/*<Route exact path="/vehicles/postCar" component={PostVehicle} />*/}
            <Route exact path="/vehicles/postCar" component={PostVehicleMainForm}/>
            <Route exact path="/vehicles/vehicleInfo" component={VehicleInfo}/>
            {/* <Route exact path="/vehicles/sellMyCar" component={MainPage} /> */}
            <ProtectedRoute exact path='/admin/sellMyCar' auth={
                { isAuthenticated: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).isAuthenticated:false}}
                component={MainPage}/>
            <ProtectedRoute exact path='/admin/selltoUs' auth={
                { isAuthenticated: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).isAuthenticated:false}}
                component={SellToUs}/>
            {/* <ProtectedRoute isAllowed={true} path="/" component={ListVehicles} /> */}
            {/* <ProtectedRoute isAllowed={true} path="/vehicles" component={ListVehicles} /> */}
            {/* <ProtectedRoute isAllowed={true} path="/vehicles/postCar" component={PostVehicle} /> */}
            {/* <ProtectedRoute isAllowed={true} path="/vehicles/vehicleInfo" component={VehicleInfo} /> */}
            <ProtectedRoute path='/admin/vehicles' auth={
                { isAuthenticated: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).isAuthenticated:false}}
                component={AdminListVehicles}/>
            <Route exact path="/admin/login" component={AdminLogin}/>
            <Route exact path="/admin/signup" component={AdminSignUp}/>
        </Grid>
    </Router>
);

export default Main