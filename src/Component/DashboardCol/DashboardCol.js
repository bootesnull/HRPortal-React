import React from "react";

const DashboardCol = () => {
    return (
        <div>
                <div className="row">
                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-primary text-white">
                            <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> Total User</p>
                                    <h3 className=""> 120</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-users" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-success text-white">
                             <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> Active Users</p>
                                    <h3 className=""> 110</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-users" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-danger text-white">
                            <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> On Leave</p>
                                    <h3 className=""> 10</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-user-times" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-info text-white">
                            <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> Projects</p>
                                    <h3 className=""> 8</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-folder-open" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-secondary text-white">
                            <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> Tasks</p>
                                    <h3 className=""> 8</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-tasks" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-2 mb-3'>
                        <div className="card bg-primary text-white">
                            <div className="card-body d-flex justify-content-between " >
                                <div>
                                    <p className="card-title"> Events</p>
                                    <h3 className=""> 2</h3>
                                </div>
                                <div>
                                    <h2><i class="fa fa-calendar" aria-hidden="true"></i></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className='col col-lg-6 mb-3'>
                        <div className="card">
                            <div className="card-body" >
                                <h5 className="card-title"> Weekly Updates</h5>
                                <hr />
                                <div>
                                    <img src="./images/chart-01.jpg" alt="chart" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col col-lg-6  mb-3'>
                        <div className="card">
                            <div className="card-body" >
                                <h5 className="card-title"> Monthly Updates</h5>
                                <hr />
                                <div>
                                    <img src="./images/chart-02.jpg" alt="chart" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col col-lg-12  mb-3'>
                        <div className="card">
                            <div className="card-body" >
                                <h5 className="card-title"> Tasks Updates</h5>
                                <hr />
                                <div>
                                    <img src="./images/fullChart.jpg" alt="chart" />
                                </div>
                            </div>
                        </div>
                    </div>

                   

                </div>

    </div>    
    );
}

export default DashboardCol;