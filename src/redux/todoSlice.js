import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
      addItem: (state,action) => 
      {state.push({name:action.payload.newTodoName,date:action.payload.newDate,status:'none',selected:false})},

      deleteItem:(state,action)=>
      state.filter((item,id)=>id !== action.payload),

      editItem:(state,action)=>
      state.map((item,id)=>(
          id===action.payload.editIdx?
          {...item ,name:action.payload.editedName}
          :
          item
      )),

      cancelItem:(state,action)=>
      state.map((item,id)=>(
          id===action.payload?
          {...item ,status:'canceled'}
          :
          item
      )),
      
      checkItem:(state,action)=>
      state.map((item,id)=>(
          id===action.payload?
          {...item ,status:'done'}
          :
          item
      ))
    },
  })

export  const {addItem,deleteItem,editItem,cancelItem,checkItem} = todoSlice.actions
export default todoSlice.reducer