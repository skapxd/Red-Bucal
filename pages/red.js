import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import LayoutFeatures from '../components/red/layout/LayoutFeatures'
import SliderImg from '../components/red/SliderImg'
import PanamaMap from '../components/contacto/PanamaMap'

const Red = () => {

    const [location, setLocation] = useState(0);

    const setLoc = (loc) => {
        setLocation(loc)
        console.log(location);
    }

    return (
        <Layout>
            <PanamaMap setLoc={setLoc}/> 
            <LayoutFeatures location={location}/>
            <SliderImg location={location}/>
        </Layout>
    )
}

export default Red