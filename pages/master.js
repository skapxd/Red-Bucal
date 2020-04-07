import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from "axios";
import Layout from '../components/layout/Layout'
import NavMaster from '../components/master/NavMaster'
import BillingAdmin from '../components/administrador/items/BillingAdmin';
import FindUserAdmin from '../components/administrador/items/FindUserAdmin';
import ServicesAdmin from '../components/administrador/items/user/ServicesAdmin';
import RecordAdmin from '../components/administrador/items/RecordAdmin';
import InfoAdmin from '../components/administrador/items/InfoAdmin';
import InforUserAdmin from '../components/administrador/items/user/InforUserAdmin'
import BillingUserAdmin from '../components/administrador/items/user/BillingUserAdmin'
import EmployeeList from '../components/empresa/items/EmployeeList'
import SetExcelList from '../components/master/items/SetExcelList'

const master = () => {

    const [select, setSelect] = useState(0);
    const [user, setUser] = useState(0);
    const [type, setType] = useState('');
    const [id, setId] = useState({})
    const [RUC, setRUC] = useState({})
    const [data, setData] = useState({})
    const [adminData, setAdminData] = useState({});
    const [activate, setactivate] = useState(false);

    const router = useRouter()

    const get = async () => {
        if (sessionStorage.getItem('tokenMaster')) {
            const url = '/api/session'
            const result = await axios.get(url)
            console.log(result);
            if (result.data.data.user._id === sessionStorage.getItem('tokenMaster')) {
                setAdminData(result.data.data.user)
            } else {
                router.replace("/")
            }
        } else {
             router.replace("/")
        }
    }

    useEffect(() => {
        get()
    }, [])

    const changeId = (e) => {
        setId({ [e.target.name]: e.target.value })
    }

    const changeRUC = (e) => {
        setRUC({ [e.target.name]: e.target.value })
    }

    const changeData = (value) => {
        setData(value)
    }

    const onClick = (selector) => {
        setSelect(selector)
    }

    const ChangeType = (type) => {
        setType(type)
    }

    const ChangeUser = (user) => {
        setUser(user)
    }

    const changeActivate = () => {
        setactivate(!activate)
    }

    return (
        <Layout>

            <NavMaster onClick={onClick} select={select} user={user} adminData={adminData} changeActivate={changeActivate} activate={activate}>
                {
                    user == 1

                    ?
                        select === 0 ? <FindUserAdmin
                            ChangeUser={ChangeUser}
                            ChangeType={ChangeType}
                            type={type}
                            changeId={changeId}
                            changeRUC={changeRUC}
                            id={id}
                            RUC={RUC}
                            changeData={changeData}
                            data={data}
                            changeActivate={changeActivate}
                        />
                            :
                            select === 1 ? <InforUserAdmin
                                data={data}
                                changeData={changeData}
                            />
                                :
                                select === 2 ? <BillingUserAdmin
                                    data={data}
                                    changeData={changeData}
                                />
                                    :
                                    select === 3 ? <ServicesAdmin
                                        data={data}
                                        changeData={changeData}
                                    />
                                        :
                                        <RecordAdmin
                                            data={data}
                                            changeData={changeData}
                                        />
                    :
                        select === 0 ? <FindUserAdmin
                            ChangeUser={ChangeUser}
                            ChangeType={ChangeType}
                            type={type}
                            changeId={changeId}
                            changeRUC={changeRUC}
                            id={id}
                            RUC={RUC}
                            changeData={changeData}
                            data={data}
                            changeActivate={changeActivate}
                        />
                            :
                            select === 1 ?  <InfoAdmin 
                                                data={data} 
                                            />
                                :
                                select === 2 ?  <BillingAdmin
                                                    data={data}
                                                    changeData={changeData}
                                                />
                                    : select === 3 ? <EmployeeList 
                                                            data={data} 
                                                            changeData={changeData}
                                                    />
                                        :
                                        <SetExcelList 
                                            data={data}
                                            changeData={changeData}
                                        />
                }
            </NavMaster>
        </Layout>
    )
}

export default master
