import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { organizationCreate, organizationStatusUpdate, organizationList } from "../../reducers/organizationReducer";
import TableModal from "../utils/TableModal";
import { toast } from "react-toastify";
import { API_URL } from "../../api";



const OrganizationTable = () => {

    const dispatch = useDispatch();
    const orgRendering = useSelector((state) => state.Organization)

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');


    const [createOrg, setCreateOrg] = useState({
        id: null,
        name: "",
        logo: "",
        domain: "",
        is_ip_enable: "",
        organization_ip_address: [],

    });



    const [selectedFile, setSelectedFile] = useState();


    console.log(createOrg)


    const [orgTbData, setOrgTbData] = useState([{}]);

    useEffect(() => {
        const callback = (data) => {
            setOrgTbData([...data])
        }
        organizationList(callback)
    }, [orgRendering])

    // console.log(orgTbData)


    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleChange = (e) => {
        setCreateOrg((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };



    const handleSubmit = (e) => {
        const formData = new FormData();
        if (createOrg.id) {
            formData.append('id', createOrg.id);
        }
        formData.append('name', createOrg.name);
        formData.append('domain', createOrg.domain);
        if (selectedFile) {
            formData.append('logo', selectedFile);
        }
        formData.append('is_ip_enable', createOrg.is_ip_enable);

        if (createOrg.is_ip_enable == 1) {
            formData.append('organization_ip_address[]', createOrg.organization_ip_address);
        }
        
        e.preventDefault();

        dispatch(organizationCreate(formData)).then((data) => {
            if (data?.payload?.statusCode == 201) {
                toast.success(data?.payload?.messsage);
                setShowBasicModal(false);
            } else {
                toast.error(data?.payload?.message);
            }
        });

        e.target.reset();
    }


    //Delete handler
    const handleUpdateStatus = (e, id) => {
        let status = e.target.checked ? 1 : 0;
        dispatch(organizationStatusUpdate({ id, status }))
    };

    const handleEventEdit = (item) => {
        console.log("gggggg",item)

        let organization_ip_address =  item.organization_ip_address.split(',')
            console.log(organization_ip_address);
        showModal()
        setCreateOrg({ ...item,organization_ip_address:organization_ip_address })
        
        setIpAddressList([...organization_ip_address])

    }


    const [ipAddressList, setIpAddressList] = useState([""]);
 
    const handleAddClick = (e, i) => {
        setIpAddressList([...ipAddressList, ""]);
    };

    const handleSubClick = (e, i) => {
        e.preventDefault();
        const list = [...ipAddressList];
        list.splice(i, 1);
        setIpAddressList(list);
    };


    const handleIpChange = (e, index) => {
        const { value } = e.target;
        const list = [...ipAddressList];
        list[index] = value;
        setIpAddressList(list);
    };

    useEffect(() => {
        ipAddressList.map((item, index) => {
        setCreateOrg(() => {
            return {
                ...createOrg,
                organization_ip_address: [...ipAddressList],
            };
        });
    });
    }, [ipAddressList ]);

    useEffect(()=>{
            if(!showBasicModal) {
            setCreateOrg({
                id: "",
                name: "",
                logo: "",
                domain: "",
                is_ip_enable: "",
                organization_ip_address: [],
            }) 
            setIpAddressList([""])
        }
    },[showBasicModal])



    


    return (
        <div>

            <h5 className="card-title"><b>Organization List</b>
                <button
                    className="btn btn-primary modal-btn"
                    onClick={() => {
                        showModal()
                        setModalTitle('Create Organization ')
                    }}
                >Create Organization </button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Org. Name</th>
                        <th>Org. Logo</th>
                        <th>Org. Domain</th>
                        <th>Ip Address Status</th>
                        <th>Org. Ip Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orgTbData && orgTbData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={item.logo} alt="Logo" /></td>
                                <td>{item.domain}</td>
                                <td>{item.is_ip_enable}</td>
                                <td>{item.organization_ip_address}</td>
                                <td>
                                    <input type="checkbox"
                                        className='cm-toggle'
                                        checked={item.status == 1 ? true : false}
                                        name="status"
                                        id={item.id}
                                        value={item.status == 1 ? true : false}
                                        onChange={(e) => handleUpdateStatus(e, item.id)}
                                    />
                                    {/* {item.status} */}
                                    <button className="btn btn-secondary  btn-sm mx-1" onClick={() => handleEventEdit(item)}  >Edit</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            <TableModal
                show={showBasicModal}
                cancelModal={setShowBasicModal}
                modalHeading={modalTitle}
                structure={(
                    <div>
                        <form className="row" onSubmit={handleSubmit} >
                            <div className="col-lg-12 mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Name'
                                    name="name"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={createOrg.name}
                                />
                            </div>

                            <div className="col-lg-12 mb-3">
                                <label className="form-label">Logo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="logo"
                                    onChange={handleFileChange}
                                // value={createOrg.logo}
                                />
                            </div>

                            <div className="col-lg-12 mb-3">
                                <label className="form-label">Domain Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Domain Name'
                                    name="domain"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={createOrg.domain}
                                />
                            </div>

                            <div className="col-lg-12 mb-3">
                                <label className="form-label">Enable/Disable Ip Address</label>
                                <select
                                    className="form-select"
                                    name="is_ip_enable"
                                    onChange={handleChange}
                                    value={createOrg.is_ip_enable ? createOrg.is_ip_enable : createOrg.is_ip_enable = 0}
                                >
                                    <option value="0">Disable Ip Address</option>
                                    <option value="1">Enable Ip Address</option>
                                </select>
                            </div>
                            { createOrg.is_ip_enable == 1 ? (
                                <div className="col-lg-12 mb-3">
                                    {ipAddressList.map((item, index) => {
                                    return (
                                        <>
                                            <div className="col d-flex mb-2">
                                                <input
                                                    name="organization_ip_address"
                                                    placeholder="Enter Ip Address"
                                                    className="form-control me-2"
                                                    value={item}
                                                    onChange={(e) => handleIpChange(e, index)}
                                                />
                                                <div className="d-flex">
                                                    {ipAddressList.length !== 1 && (
                                                        <button className="btn btn-secondary btn-sm" onClick={(e) => handleSubClick(e, index)}> - </button>
                                                    )}
                                                    {ipAddressList.length - 1 === index && (
                                                        <button className="btn btn-secondary btn-sm ms-2" onClick={handleAddClick}> + </button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                                {console.log(ipAddressList)}
                            </div>
                            ) : "" }

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>setShowBasicModal(false)}  >Cancel</button>
                                <button type="submit" className="btn btn-primary"  >Save</button>
                            </div>
                        </form>
                    </div>
                )}
            />


        </div>


    );
}

export default OrganizationTable;