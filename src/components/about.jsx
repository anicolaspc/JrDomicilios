import React from "react";
import { Card, Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        bordered={false}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Title level={2} style={{ color: "#1890ff" }}>
          Misión
        </Title>
        <Paragraph style={{ textAlign: "justify" }}>
          Nuestra misión en <b>JR Domicilios</b> es proporcionar un servicio de
          domicilios excepcional y confiable en el sector de Villa del Rosario.
          Estamos comprometidos a satisfacer las necesidades y deseos de
          nuestros clientes al entregar sus productos de manera segura,
          eficiente y puntual. A través de nuestro equipo altamente capacitado
          y dedicado, buscamos simplificar la vida de nuestra comunidad al
          brindar soluciones de entrega a domicilio que superen las
          expectativas. Valoramos la calidad, la integridad y la atención al
          detalle en cada interacción, estableciendo así un vínculo de confianza
          duradero con nuestros clientes y socios comerciales.
        </Paragraph>
        <Divider/>
        <Title level={2} style={{ color: "#1890ff" }}>
          Visión
        </Title>
        <Paragraph style={{ textAlign: "justify" }}>
          Nuestra visión en <b>JR Domicilios</b> es convertirnos en la principal
          empresa de domicilios en el sector de Villa del Rosario, reconocida
          por nuestra excelencia operativa y compromiso inquebrantable con la
          satisfacción del cliente. Aspiramos a expandir nuestros servicios para
          abarcar una amplia gama de necesidades de entrega, desde productos
          comerciales hasta personales, utilizando tecnología innovadora para
          optimizar nuestros procesos. Buscamos ser un motor de crecimiento
          económico en la comunidad, generando empleo y fomentando la
          colaboración con comerciantes locales. A medida que crecemos,
          mantenemos nuestro enfoque en la mejora continua y en la creación de
          un impacto positivo en la vida de las personas a las que servimos y en
          la comunidad en general.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;