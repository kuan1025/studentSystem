import { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from './client';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Table, Spin, Empty, Button, Badge, Tag, Avatar, Popconfirm , Radio} from 'antd';
import StudentDrawerForm from './StudentDrawerForm';
import { successNotification, errorNotification } from "./notification";



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function App() {

  const { Header, Content, Footer, Sider } = Layout;
  const TheAvatar = ({ name }) => {
    let trim = name.trim();
    if (trim.length === 0) {
      return <Avatar icon={<UserOutlined />} />
    }
    const split = trim.split(" ");
    if (split.length === 1) {
      return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
  }

  const deleteStudentById = (student, callback) => {
    deleteStudent(student.id).then(() => {
      successNotification("student success deleted", `${student.name} was removed to the system`);
      callback();
    }).catch(err =>{
      err.response.json().then(resp=>{
          errorNotification("There was an issue", `${resp.message} [status code ${resp.status}][${resp.error}]`)
         })
  })
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, student) => <TheAvatar name={student.name} />
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, student) =>
        <Radio.Group>
          <Popconfirm placement='topRight' title={`Are you sure to delete ${student.name}`} onConfirm={() => deleteStudentById(student, fetchStudents)} okText="Yes" cancelText="No">
            <Radio.Button>Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button value="small">Edit</Radio.Button>
        </Radio.Group>
    }
  ];

  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false)

  const fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data);
      })
      .catch(error =>{
         error.response.json().then(resp=>{
          errorNotification("There was an issue", `${resp.message} [status code ${resp.status}][${resp.error}]`)
         })
        }).finally(()=>setFetching(false));
  }

  useEffect(() => {
    console.log('Component is mounted');
    fetchStudents();
  }, []);


  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />
    }
    if (students.length <= 0) {
      return <Empty />
    }
    return <>
      <StudentDrawerForm
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        fetchStudent={fetchStudents}
      />
      <Table
        dataSource={students}
        columns={columns}
        bordered
        title={() =>
          <>
            <Tag style={{ margin: "0px 5px" }}>Number of students</Tag>
            <Badge count={students.length} className='site-badge-count-4' />
            <br />
            <br />
            <Button
              onClick={() => { setShowDrawer(!showDrawer) }}
              type="primary"
              shape="round"
              icon={<PlusOutlined />} size="small">
              Add New Student
            </Button>
          </>
        }
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        rowKey={(student) => student.id}
      />;
    </>

  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>Option 1</Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>Option 2</Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>User</Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>Team</Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />}>Files</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff',
              borderRadius: '8px',
            }}
          >
            <div className='site-layout-background' style={{ padding: 24, minHeight: 36 }}>
              {renderStudents()}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          By Kuan
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
