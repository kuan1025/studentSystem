import { useState, useEffect } from 'react';
import { getAllStudents } from './client';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Table, Spin, Empty, Button } from 'antd';
import StudentDrawerForm from './StudentDrawerForm';

const columns = [
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
];



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function App() {
  const { Header, Content, Footer, Sider } = Layout;
  
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false)

  const fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setFetching(false);
      })
      
      .catch(error => console.error("Error fetching students:", error));
  }

  useEffect(() => {
    console.log('Component is mounted');
    fetchStudents();
  }, []);


  const renderStudents = () =>{
    if(fetching){
      return <Spin indicator={antIcon} />
    }
    if(students.length <= 0 ){
      return <Empty/>
    }
    return <>
    <StudentDrawerForm
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
    />
    <Table 
      dataSource={students}
      columns={columns} 
      bordered
      title={() => 
      <Button 
        onClick={()=>{setShowDrawer(!showDrawer)}}
        type="primary" 
        shape="round" 
        icon={<PlusOutlined />} size="small">
        Add New Student 
     </Button>}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 240 }}
      rowKey = {(student) => student.id}
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
            <div className='site-layout-background' style={{padding:24, minHeight:36}}>
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
