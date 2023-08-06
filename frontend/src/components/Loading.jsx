import React from 'react'
import LoadingSpin from "react-loading-spin";

// style = {{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}

function Loading() {
    return (
        <div className="container-fluid" style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center" }}>
            <div className="ExampleOfUsage" style={{ marginTop: "30vh" }}>
                <LoadingSpin />
            </div>
        </div>
    )
}

export default Loading