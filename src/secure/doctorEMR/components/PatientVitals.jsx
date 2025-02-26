

function PaitentVitals() {
    return (
        <div>
            <div >
                <div className="card">
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="row">
                            <div className="col-md-1">
                                <strong>Latest Vitals</strong>
                            </div>
                            <div className="col-md-1">
                                <p><strong>Pluse:</strong>66bpm</p>
                            </div>
                            <div className="col-md-1">
                                <p><strong>SpO2:</strong>98%</p>
                            </div>
                            <div className="col-md-2">
                                <p><strong>Respiration:</strong> 18 bpm</p>
                            </div>
                            <div className="col-md-2">
                                <p><strong>Temperature:</strong>99.6</p>
                            </div>
                            <div className="col-md-2">
                                <p><strong>Weight:</strong>99.6 deg F</p>
                            </div>
                            <div className="col-md-2">
                                <p><strong>Height:</strong>99.6 deg F</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PaitentVitals;