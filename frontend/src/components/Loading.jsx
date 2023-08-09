import React from 'react'
import LoadingSpin from "react-loading-spin";

// style = {{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}

function Loading() {
    return (
        // <div className="" style={{zIndex:"100", position:'fixed',left:"0",top:"0",width:"100vw", height: "100vh", display: "flex", justifyContent: "center",backgroundColor:"rgba(0,0,0,.1)" }}>
        <div>
            {/* <div className="ExampleOfUsage"> */}
            <LoadingSpin />
            {/* </div> */}
        </div>
    )
}

export default Loading