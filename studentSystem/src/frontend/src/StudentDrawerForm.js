import { Drawer, Input, Col, Select, Form, Row, Button } from "antd";
import { addNewStudent } from "./client";


const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer}){

    const onClose = () => setShowDrawer(false);

    const onFinish = student =>{
        
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student).then(()=>{
            console.log('added student')
        }).catch(err =>{
            console.log(err)
        })
    };

    const onFinishFailed = errorInfo =>{
        alert(JSON.stringify(errorInfo, null, 2))
    }

    return <Drawer 
        title = "Create new Student"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign:'right'
                }}
            >
                <Button onClick={onClose} style={{marginRight : 8}}> 
                    Cancel
                </Button>    
            </div>
        }
    >
        <Form layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required:true, message: "Please enter student name"}]}
                    >
                        <Input placeholder="Please inter student name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required:true, message: "Please enter student email"}]}
                    >
                        <Input placeholder="Please inter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required:true, message: "Please select student gender"}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value='MALE'>MALE</Option>
                            <Option value='FEMALE'>FEMALE</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                            submit
                        </Button>
                     </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}
export default StudentDrawerForm;