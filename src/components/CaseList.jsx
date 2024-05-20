import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Row, Col, Card, Spin } from 'antd';
import { $cases, fetchCasesFx } from '../store/cases';
import './CaseList.scss';

const { Meta } = Card;

const CaseList = () => {
  const cases = useUnit($cases);
  const loading = useUnit(fetchCasesFx.pending);

  useEffect(() => {
    fetchCasesFx();
  }, []);
  const firstRowCases = cases.slice(0, Math.ceil(cases.length / 2));
  const secondRowCases = cases.slice(Math.ceil(cases.length / 2));
  const isLightColor = (color) => {
    if (color.startsWith('#')) {
      color = color.slice(1);
    }
  
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 200;
  };
  return (
    <div className="case-list">
      {loading ? (
        <Spin className='spinLoader' size="large" />
      ) : (
        <>
      <Row gutter={[16, 16]}>
        {firstRowCases.map(item => (
          <Col xs={24} sm={24} md={24} lg={24} key={item.Id}>
            <a href={`/case/${item.FriendlyURL}`} className="case-link">
              <Card
                style={{ backgroundColor: `#${item.CaseColor}` }}
                hoverable
                cover={<img className='case-card__img' alt={item.Title} src={item.Image} />}
                className={!isLightColor(item.CaseColor) ? "case-card" : "case-card case-card__block"}
              >
                <div className="overlay" style={{ backgroundColor: `#${item.CaseColor}` }}>
                  <Meta title={item.Title} description={item.FeaturesTitle} />
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        {secondRowCases.map(item => (
          <Col xs={24} sm={24} md={24} lg={24} key={item.Id}>
            <a href={`/case/${item.FriendlyURL}`} className="case-link">
              <Card
                style={{ backgroundColor: `#${item.CaseColor}` }}
                hoverable
                cover={<img className='case-card__img' alt={item.Title} src={item.Image} />}
                className={!isLightColor(item.CaseColor) ? "case-card" : "case-card case-card__block"}
              >
                <div className="overlay" style={{ backgroundColor: `#${item.CaseColor}` }}>
                  <Meta title={item.Title} description={item.FeaturesTitle} />
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
      )}
    </div>
  );
};

export default CaseList;
