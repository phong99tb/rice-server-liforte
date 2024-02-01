import { Button, Input, InputNumber, Modal, Select, Table, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../api/api'
import dayjs from 'dayjs';

const Spend = () => {
  const [users, setUsers] = useState([]);
  const [spends, setSpend] = useState([]);
  const [optionUser, setOptionUser] = useState([]);
  const [itemModal, setItemModal] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState();
  const [messApi, setMessApi] = useState();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'idUser',
      key: 'idUser',
      render: (idUser) => {
        return (
          <p>{users.find(item => item._id === idUser)?.name}</p>
        )
      }
    },
    {
      title: 'Money Spend',
      dataIndex: 'moneySpend',
      key: 'moneySpend',
      render: (moneySpend) => {
        return (
          <p>{moneySpend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        )
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (_id) => {
        return (
          <div>
            <Button onClick={() => editSpend(_id)} style={{ margin: "0 10px 0 0" }}>Sửa</Button>
            <Button onClick={() => deleteSpend(_id)}>Xóa</Button>
          </div>
        )
      }
    },
  ];

  const addSpend = () => {
    setStatusModal("add")
    setItemModal({ "idUser": "", "moneySpend": 0, "date": "", "note": "" })
    showModal()
  }

  const deleteSpend = async (id) => {
    const response = await api.deleteSpend(id);
    setMessApi(response)
  }

  const editSpend = (id) => {
    setStatusModal("edit")
    setItemModal(spends.find(item => item._id === id))
    showModal()
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (statusModal === "edit") {
      const response = await api.updateSpend(itemModal);
      setMessApi(response)
    } else {
      const response = await api.addSpend(itemModal);
      setMessApi(response)
    }
    setIsModalOpen(false);
    console.log(itemModal);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeMoney = (value) => {
    setItemModal({ ...itemModal, moneySpend: value });
  };

  const changeNote = (e) => {
    setItemModal({ ...itemModal, note: e.target.value });
  }

  const handleChange = (value) => {
    setItemModal({ ...itemModal, idUser: value });
  };

  const changeDate = (date, dateString) => {
    setItemModal({ ...itemModal, date: dateString });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await api.getUsers();
        setUsers(usersData);
        console.log(usersData);
        var arrTemp = []
        usersData.map((item)=>{
          var itemTemp = {
            "value": item._id,
            "label": item.name 
          }
          arrTemp.push(itemTemp)
        })
        setOptionUser(arrTemp)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depositData = await api.getSpend();
        setSpend(depositData);
        console.log(depositData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [messApi]);
  return (
    <div>
      <h1>Spend</h1>
      <Button onClick={addSpend}>Thêm người nạp quỹ</Button>
      <Table dataSource={spends} columns={columns} scroll={{ y: `calc(100vh - 300px)` }} />
      <Modal title={statusModal === "edit" ? "Sửa" : "Thêm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          style={{ width: "100%", margin:"0 0 10px" }}
          onChange={handleChange}
          options={optionUser}
          value={itemModal.idUser}
        />
        <InputNumber
          style={{ width: "100%", margin:"0 0 10px" }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          onChange={onChangeMoney}
          value={itemModal.moneySpend}
        />
        <DatePicker onChange={changeDate} style={{ width: "100%", margin:"0 0 10px"}} value={dayjs(itemModal.date)} />
        <Input
          type="text"
          placeholder="Note"
          style={{ margin: "0 0 10px 0" }}
          value={itemModal.note}
          onChange={changeNote}
        />
      </Modal>
    </div>
  )
}

export default Spend