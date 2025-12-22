import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Title level={2}>关于项目</Title>
        <Paragraph>
          这是一个使用现代前端技术栈构建的 React 应用示例。
        </Paragraph>
        <Paragraph>
          项目结构清晰，代码规范，适合作为新项目的起始模板。
        </Paragraph>
      </Card>
    </div>
  )
}

export default About

