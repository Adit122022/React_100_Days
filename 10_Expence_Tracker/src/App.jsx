import React, { useState } from 'react';
import { Delete, Edit, Plus, Search } from 'lucide-react';
import { DatePicker, Empty, Form, Input, InputNumber, Modal } from 'antd';
import moment from 'moment';
import { useExpense } from './zustand/useExpense';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  const { expenses, setExpenses, deleteExpenses } = useExpense();

  const createExpenses = (value) => {
    value.date = moment(value.date).format("DD-MM-YY, hh:mm A");
    setExpenses(value)
    setIsModalOpen(false);
    form.resetFields();
    console.log("Expense Created:", value);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto shadow-[0_0_10px_rgba(99,102,241,0.3)] bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 border-b border-white/20">
          <h1 className="text-3xl font-bold text-white tracking-wide">Expense Tracker</h1>
          <button onClick={openModal}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all hover:scale-105 font-semibold">
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg border border-white/20 mx-6 my-6 px-3 py-2 text-white focus-within:ring-2 ring-indigo-500 transition">
          <Search className="w-5 h-5 opacity-70" />
          <input
            type="text"
            placeholder="Search expenses..."
            className="bg-transparent outline-none flex-1 text-sm text-white placeholder-white/70"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto px-6 pb-6">
          {
            expenses.length === 0 ? (
              <div className='w-full flex items-center justify-center col-span-4'><
                Empty />
              </div>
            ) : (
              <> <div className="flex items-center justify-end px-5 py-2  shadow-lg">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-lg tracking-wide">
                  Total Expenses&nbsp;
                  <span className="text-white">₹{expenses.reduce((sum, item) => sum + item.amount, 0)}</span>
                </h1>
              </div>

                <table className="w-full text-sm text-left text-white border-collapse">
                  <thead>
                    <tr className="bg-indigo-600 text-white text-sm uppercase tracking-wider">
                      <th className="py-3 px-4 rounded-tl-lg">Title</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 rounded-tr-lg text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">


                    {expenses.map((item, id) => (<tr key={id} className="hover:bg-white/10 transition">
                      <td className="py-3 px-4 font-medium">{item.title}</td>
                      <td className="py-3 px-4 text-white/80">{item.description}</td>
                      <td className="py-3 px-4 font-semibold text-green-400">₹{item.amount}</td>
                      <td className="py-3 px-4 text-white/70">{item.date}</td>
                      <td className="py-3 px-4 flex justify-center gap-2">
                        <button onClick={() => { deleteExpenses(id) }} className="bg-red-500 cursor-pointer active:scale-95 hover:bg-red-600 p-2 rounded-lg transition-all">
                          <Delete className="w-4 h-4" />
                        </button>
                        <button className="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>)
                    )

                    }
                  </tbody>
                </table>
              </>
            )
          }
        </div>
      </div>
      <Modal className="custom-modal" open={isModalOpen} onCancel={closeModal} title="Add Expense" footer={null}>
        <Form form={form} layout='vertical' className='bg-transparent' onFinish={createExpenses}>
          <Form.Item label="Expense Title" name="title" rules={[{ required: true, message: 'Please enter expense title' }]}>
            <Input size='large' placeholder='Expense Name Here' />
          </Form.Item>
          <Form.Item label="Expense Description" name="description" rules={[{ required: true, message: 'Please enter expense description' }]}>
            <Input.TextArea rows={4} size='large' placeholder='Expense Description Here' />
          </Form.Item>
          <div className='flex justify-between '>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter expense amount' }]}>
              <InputNumber size='large' placeholder='Amount' />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please enter expense date' }]}>
              <DatePicker size='large' placeholder='Date' />
            </Form.Item>
          </div>
          <Form.Item>
            <button type='submit' className='w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all  font-semibold'>
              Add Expense
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
