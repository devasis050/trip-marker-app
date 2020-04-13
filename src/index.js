import { Provider } from "react-redux"
import React from "react";
import ReactDOM from 'react-dom';
import store from './redux/store';
import MapComponent from './map/component/mapComponent';
import MarkerList from './map/component/markerList';
import DirectionComponent from './direction/component/directionComponent';
import SearchComponent from './search/component/searchComponent';
import Header from './header/component/headerComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthRedirect from './authredirect/component/authRedirectComponent';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sidebarCollapse:false};
    }

    sideBarCollapseButtonHandler() {
        this.setState({sidebarCollapse:!this.state.sidebarCollapse});
    }

    render() {
        const sideBarGridClassName = this.state.sidebarCollapse ? 'd-none' : 'col-9 col-sm-4';
        const mapGridClassName = this.state.sidebarCollapse ? 'col-12' : 'col-3 col-sm-8';
        
        return (
            <div className='container-fluid pt-2 h-100'>
                <Header />
                <div className='row bg-light mt-1 h-100'>
                    <div className={sideBarGridClassName}>
                        <div>
                            <SearchComponent />
                            <MarkerList />
                            <DirectionComponent/>
                        </div>
                    </div>
                    <div className={mapGridClassName}>
                        <button style={{zIndex:1, left:0}} type="button" id="sidebarCollapse" 
                                onClick = {() => this.sideBarCollapseButtonHandler()}
                                className="position-absolute btn btn-secondary">
                            {this.state.sidebarCollapse ? (<i className="fas fa-chevron-right"></i>) : <i className="fas fa-chevron-left"></i>}
                        </button>
                        <MapComponent />
                    </div>
                </div>
            </div>
        )
    }
} 

const Root = () => {
    return (
        <Provider store= {store} >
            <App />
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.querySelector("#app"))