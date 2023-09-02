import React from 'react';
import { Col } from 'antd';
import IndividuSearch from '../../components/IndividuSearch/IndividuSearch';
import IndividuTable from '../../components/IndividuTable/IndividuTable';

const IndividuCustomer: React.FC = () => {
  return (
    <Col>
      <IndividuSearch />
      <IndividuTable />
    </Col>
  );
};

export default IndividuCustomer;
