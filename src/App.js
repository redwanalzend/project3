import './App.scss';
import { Row,Col,Typography,List,Modal, Button, Input } from 'antd'
import {PlusCircleFilled,DeleteFilled,EditFilled,CloseOutlined,CheckOutlined} from '@ant-design/icons'
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {addItem,deleteItem,editItem,cancelItem,checkItem} from './redux/todoSlice'

const {Title,Text} = Typography

const months=[
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December' 
]


function App() {
  const[open,setOpen]=useState(false)
  const[newTodoName,setNewTodoName]=useState('')
  const[editModalOpen,setEditModalOpen]=useState(false)
  const[editedName,setEditedName]=useState('')
  const[editIdx,setEditIdx]=useState(0)
  const[newDate,setNewDate]=useState('')

  const todo = useSelector((state)=>state.todo)
  const dispatch = useDispatch()

  const handleChange =(e)=>{
    setNewTodoName(e.target.value)
  }

  const handleEditedNameChange =(e)=>{
    setEditedName(e.target.value)
  }


  const handleDate = () =>{
    const newDate =new Date()
    const day=newDate.getUTCDate()
    const month=months[newDate.getMonth()]
    const year=newDate.getFullYear()
    let hour = newDate.getHours()
    const amORpm = hour >= 12 ? 'pm' : 'am'
    hour = hour % 12
    hour=hour < 10 ? '0'+hour : hour
    const time=hour+':'+newDate.getMinutes()
    const getSuffex = ()=>{
          switch (day) {
          case 1: case 21: case 31: return "st";
          case 2: case 22:          return "nd";
          case 3: case 23:          return "rd";
          default:                  return "th"
      }
    }
    const suffex=getSuffex()
    setNewDate(`${month} ${day}${suffex},  ${year} ${time} ${amORpm}`)
  }

  return (
    <div className='app'>
      <Row justify='center'>
        <Col>
          <Title className='title'  >Todo List</Title>
        </Col>
      </Row>
      <Row justify='center'>
        <Col className='list-container' span={16} >
          <Row   justify='center' >
            <Col span={24}>
              <List
              itemLayout="horizontal"
              dataSource={todo}
              renderItem={(item,idx)=>(
                <List.Item key={idx} className='list-item' style={{backgroundColor:item.status === 'canceled'? '#eb3737' : item.status ==='done'?'#1de90f':'#fdfdfd'}}>
                  <List.Item.Meta
                    title={<Text style={{fontSize:'0.7rem',fontWeight:'300' ,color:item.status ==='none'?'#b0b0b0':'white'}}>{item.date}</Text>}
                    description={<Text style={{fontSize:'1.1rem',fontWeight:'400',color:item.status ==='none'?'black':'white'}}>{item.name}</Text>}
                  />
                  <Button shape='circle' onClick={()=>dispatch(deleteItem(idx))}  className={item.status==='none'?'delete-button':'delete-button-inverted'}  icon={<DeleteFilled  className='action-icon'   style={{color:item.status==='none'?'white':'#eb3737'}}/>}/>
                  {
                    item.status === 'none'?
                    <React.Fragment>
                      <Button shape='circle' onClick={()=>{setEditModalOpen(true);setEditIdx(idx)}} className='action-button' style={{backgroundColor:'#4292d8'}} icon={<EditFilled className='action-icon'/>}/>
                      <Button shape='circle' onClick={()=>dispatch(cancelItem(idx))} className='action-button' style={{backgroundColor:'#eb3737'}} icon={<CloseOutlined  className='action-icon'/>}/>
                      <Button shape='circle' onClick={()=>dispatch(checkItem(idx))} className='action-button' style={{backgroundColor:'#1de90f',marginRight:'0'}} icon={<CheckOutlined className='action-icon'/>}/>
                    </React.Fragment>
                    :
                    <React.Fragment/>
                  }
                </List.Item>
              )}
              />
              <Modal 
              centered 
              closable={false}
              onCancel={()=>{setEditModalOpen(false);setEditedName('')}} 
              visible={editModalOpen} 
              footer={null}  
              width='60%'
              >
                <Row>
                  <Col span={14} >
                    <Input placeholder='Edit Task...' value={editedName} onChange={handleEditedNameChange} style={{borderRadius:'10px',backgroundColor:'#f4f4f4' }} />
                  </Col>
                  <Col style={{marginLeft:'auto'}} >
                    <Button onClick={()=>{setEditModalOpen(false);setEditedName('')}}  style={{backgroundColor:'#fde5e5',borderRadius:'10px',width:'110px'}} >
                      <Text style={{color:'#ff5e5e'}}>cancel</Text>
                    </Button>
                  </Col>
                  <Col style={{marginLeft:'10px'}} >
                    <Button onClick={()=>{dispatch(editItem({editedName,editIdx}));setEditModalOpen(false);setEditedName('')}}
                    style={{backgroundColor:'#def7ef',borderRadius:'10px',width:'110px'}}>
                      <Text style={{color:'#16ab93'}}>done</Text>
                    </Button>
                  </Col>
                </Row>
              </Modal>
              </Col>
          </Row>
          <Row justify='center' className='add-button'>
            <Button 
            shape='circle'
            onClick={()=>{setOpen(true);handleDate();}}
            style={{border:'none'}}
            icon={
              <PlusCircleFilled
              style={{color:'#45e220',fontSize:'3rem'}}
              />}
            />
            <Modal 
            centered 
            closable={false}
            onCancel={()=>{setOpen(false);setNewTodoName('')}} 
            visible={open} 
            footer={null}  
            width='60%'
            >
              <Row>
                <Col span={14} >
                  <Input placeholder='Type Any Task...' value={newTodoName} onChange={handleChange} style={{borderRadius:'10px',backgroundColor:'#f4f4f4' }} />
                </Col>
                <Col style={{marginLeft:'auto'}} >
                  <Button onClick={()=>{setOpen(false);setNewTodoName('')}}  style={{backgroundColor:'#fde5e5',borderRadius:'10px',width:'110px'}} >
                    <Text style={{color:'#ff5e5e'}}>cancel</Text>
                  </Button>
                </Col>
                <Col style={{marginLeft:'10px'}} >
                  <Button onClick={()=>{dispatch(addItem({newTodoName,newDate}));setOpen(false);setNewTodoName('')}}
                   style={{backgroundColor:'#def7ef',borderRadius:'10px',width:'110px'}}>
                    <Text style={{color:'#16ab93'}}>done</Text>
                  </Button>
                </Col>
              </Row>
            </Modal>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
