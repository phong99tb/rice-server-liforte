import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Table, Modal, Input, InputNumber, Button } from 'antd';

const User = () => {
    const [users, setUsers] = useState([]);
    const [itemModal, setItemModal] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusModal, setStatusModal] = useState();
    const [messApi, setMessApi] = useState();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Money',
            dataIndex: 'moneyUser',
            key: 'moneyUser',
            render: (moneyUser) => {
                return (
                    <p>{moneyUser.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: (_id) => {
                return (
                    <div>
                        <Button onClick={() => editUser(_id)} style={{ margin: "0 10px 0 0" }}>Sửa</Button>
                        <Button onClick={() => deleteUser(_id)}>Xóa</Button>
                    </div>
                )
            }
        },
    ];

    const addUser = () => {
        setStatusModal("add")
        setItemModal({ "name": "", "moneyUser": 0 })
        showModal()
    }

    const deleteUser = async (id) => {
        const response = await api.deleteUser(id);
        setMessApi(response)
    }

    const editUser = (id) => {
        setStatusModal("edit")
        setItemModal(users.find(item => item._id === id))
        showModal()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async() => {
        if (statusModal === "edit") {
            const response = await api.updateUser(itemModal);
            setMessApi(response)
        } else {
            const response = await api.addUser(itemModal);
            setMessApi(response)
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeMoney = (value) => {
        setItemModal({ ...itemModal, moneyUser: value });
    };

    const changeName = (e) => {
        setItemModal({ ...itemModal, name: e.target.value });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await api.getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [messApi]);

    return (
        <div>
            <h1>Users</h1>
            <Button onClick={addUser}>Thêm người</Button>
            <Table dataSource={users} columns={columns} scroll={{ y: `calc(100vh - 300px)` }} />
            <Modal title={statusModal === "edit" ? "Sửa" : "Thêm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input
                    type="text"
                    placeholder="Name"
                    style={{ margin: "0 0 10px 0" }}
                    value={itemModal.name}
                    onChange={changeName}
                />
                <InputNumber
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChangeMoney}
                    value={itemModal.moneyUser}
                />
            </Modal>
        </div>
    )
}

export default User