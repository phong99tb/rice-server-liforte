import React, { useState } from 'react'
import User from '../component/user'
import Deposit from '../component/deposit'
import Spends from '../component/spends'

const Layout = () => {
    const [menuChoise, setMenuChoise] = useState(0)
    const menuList = [
        "Danh sách người dùng",
        "Danh sách nạp quỹ",
        "Danh sách tiêu dùng"
    ]
    const selectMenu = (index) => {
        setMenuChoise(index)
    }
    return (
        <div className='over'>
            <div className='menu'>
                <div className='menu__list'>
                    {
                        menuList.map((item, index)=>{
                            return (
                                <p className='menu__item' onClick={()=>selectMenu(index)} key={item} >{item}</p>
                            )
                        })
                    }
                </div>
            </div>
            <div className='content'>
                <div className='header'>
                    header
                </div>
                <div className='component'>
                    {
                        menuChoise === 0 ? <User/> : 
                        menuChoise === 1 ? <Deposit/> :
                        <Spends/>
                    }
                </div>
            </div>
        </div>
    )
}

export default  Layout